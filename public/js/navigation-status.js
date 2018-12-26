$(document).ready(function () {
    var options = {
        element: $("#navigation-status-icon"),
        icons: {
            checking: "glyphicon glyphicon-question-sign",// Checking if the API is online
            up: "glyphicon glyphicon-ok-sign",// API is online
            down: "glyphicon glyphicon-remove-sign",// API is offline
            updating: "glyphicon glyphicon-refresh"// API is online and an update is running
        },
        colors: {
            checking: "gray",
            up: "#00b900",
            down: "red",
            updating: "#00b900"
        },
        titles: {
            checking: "Checking status...",
            up: "Online",
            down: "Offline",
            updating: "Online, update running"
        },
        uptimerobot: {
            apiKey: "m778205490-919fd9fee1f949d6918f8c05"// Monitor-Specific key, not really useful to copy ;)
        }
    };
    var display = {
        checking: function () {
            options.element.removeClass();
            options.element.css("color", options.colors.checking);
            options.element.addClass(options.icons.checking);
            options.element.attr("title", options.titles.checking);
        },
        up: function () {
            options.element.removeClass();
            options.element.css("color", options.colors.up);
            options.element.addClass(options.icons.up);
            options.element.attr("title", options.titles.up);
        },
        down: function () {
            options.element.removeClass();
            options.element.css("color", options.colors.down);
            options.element.addClass(options.icons.down);
            options.element.attr("title", options.titles.down);
        },
        updating: function () {
            options.element.removeClass();
            options.element.css("color", options.colors.updating);
            options.element.addClass(options.icons.updating);
            options.element.attr("title", options.titles.updating);
        }
    };
    window.navStatusDisplay = display;

    // Show checking icon
    display.checking();

    $.ajax({
        url: "https://api.uptimerobot.com/getMonitors?format=json&apiKey=" + options.uptimerobot.apiKey,

        jsonpCallback: "jsonUptimeRobotApi",
        success: function (response) {
            console.log(response);
            handleStatus(response.monitors.monitor[0]);
        },
        error: function (xhr, status, error) {
            // Something is wrong
            display.down();
            console.log(error);
        }
    });

    function handleStatus(status) {
        // 0 - paused
        // 1 - not checked yet
        // 2 - up
        // 8 - seems down
        // 9 - down
        var statusCode = status.status;

        if (statusCode <= 2) {
            display.up();

            // Check if an update is running
            $.ajax({
                url: "https://api.spiget.org/v2/status?callback=?",

                success: function (status) {
                    console.log(status)
                    if (status.status.fetch.active) {// update is running
                        display.updating();
                    }
                }
            })
        } else {
            display.down();
        }
    }


});