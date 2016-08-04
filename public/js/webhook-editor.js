window.webhook = {
    loadEvents: function () {
        $.ajax({
            url: "https://api.spiget.org/v2/webhook/events?spiget__ua=SpigetWebhooks&callback=?",
            dataType: "jsonp",
            success: function (events) {
                $.each(events.events, function (k, v) {
                    $("#events_group").append("<input type='checkbox' class='webhook-event' value='" + v + "'> " + v + "<br/>");
                });
            }
        });
    },
    ignoreConnection: false,
    testConnection: function (url, event, callback) {
        if (webhook.ignoreConnection) {
            callback(true);
            return;
        }
        $("#registerButton").prop("disabled", true);
        Alert.alert("info", "Testing connection...", true);
        $.ajax({
            url: "https://tools.inventivetalent.org/connection/ping.php?spiget__ua=SpigetWebhooks&callback=?&method=POST&url=" + btoa(url),
            dataType: "jsonp",
            success: function (r) {
                if (r.success) {
                    $("#registerButton").prop("disabled", false);
                    Alert.alert("success", "Connection was successful", true);
                    callback(true);
                } else {
                    Alert.alert("danger", "", true);
                    $("#footer_alert_value").append("Connection failed. Status code: " + err.code + " | If you are sure it will work anyway, <a href='#' id='ignoreConnection'>click here</a>");
                    callback(false);
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                if (err === undefined) {
                    err = {
                        code: -1
                    };
                }
                Alert.alert("danger", "", true);
                $("#footer_alert_value").append("Connection failed. Status code: " + err.code + " | If you are sure it will work anyway, <a href='#' id='ignoreConnection'>click here</a>");
                callback(false);
            }
        });
    },
    register: function (url, events) {
        $("#registerButton").prop("disabled", true);
        $("#webhookId").val("");
        $("#webhookSecret").val("");
        $.ajax({
            url: "https://api.spiget.org/v2/webhook/register?spiget__ua=SpigetWebhooks&",
            method: "POST",
            type: "POST",
            data: {
                url: url,
                events: JSON.stringify(events)
            },
            success: function (r) {
                $("#webhookId").val(r.id);
                $("#webhookSecret").val(r.secret);
                Alert.alert("success", "Webhook created. Make sure to save the ID & Secret!", true);

                $("#registerButton").prop("disabled", false);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                Alert.alert("danger", "Error: " + err.error, true);

                $("#registerButton").prop("disabled", false);
            }
        });
    },
    remove: function (id, secret) {
        $("#removeButton").prop("disabled", true);
        $.ajax({
            url: "https://api.spiget.org/v2/webhook/delete/" + id + "/" + secret + "?spiget__ua=SpigetWebhooks&",
            // dataType : "jsonp",
            method: "POST",
            type: "POST",
            success: function (r) {
                Alert.alert("success", "Webhook removed", true);

                $("#removeButton").prop("disabled", false);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                if (err === undefined) {
                    err = {
                        code: -1
                    };
                }
                Alert.alert("danger", "Error: " + err.error, true);

                $("#removeButton").prop("disabled", false);
            }
        });
    }
};

$(document).ready(function () {
    webhook.loadEvents();

    var validateRegister = function () {
        var disabled = false;

        if ($("#targetUrl").val().trim().length == 0) {
            disabled = true;
        } else {
            disabled = false;
        }

        if (!disabled) {
            c = 0;
            $("input.webhook-event:checked").each(function () {
                c++;
            });
            console.log(c);
            if (c > 0) {
                disabled = false;
            } else {
                disabled = true;
            }
        }
        $("#registerButton").prop("disabled", disabled);
    };
    $("#targetUrl").on("keyup change", validateRegister);
    $(document).on("change", "input.webhook-event", validateRegister);

    var validateDelete = function () {
        if ($("#delete-id").val().trim().length == 0 || $("#delete-secret").val().trim().length == 0) {
            $("#deleteButton").prop("disabled", true);
        } else {
            $("#deleteButton").prop("disabled", false);
        }
    };
    $("#delete-id").on("keyup change", validateDelete);
    $("#delete-secret").on("keyup change", validateDelete);

    $("#registerButton").click(function (e) {
        e.preventDefault();

        $url = $("#targetUrl").val();
        $events = [];
        $("input.webhook-event:checked").each(function () {
            $events.push($(this).val());
        });

        webhook.testConnection($url, $events[0], function (success) {
            if (success) {
                setTimeout(function () {
                    webhook.register($url, $events);
                }, 200);
            }
        });

    });
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        $id = $("#delete-id");
        $secret = $("#delete-secret");

        webhook.remove($id.val().trim(), $secret.val().trim());
    });

    $(document).on("click", "#ignoreConnection", function (e) {
        e.preventDefault();
        webhook.ignoreConnection = true;
        $("#registerButton").prop("disabled", false);
    });
});
