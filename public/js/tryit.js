$(document).ready(function () {
    var allMethods = new Array();

    $.ajax({
        url: "https://raw.githubusercontent.com/SpiGetOrg/Documentation/master/swagger.json",
        dataType: "json",
        success: function (swagger) {
            $.each(swagger.paths, function (path, data) {
                allMethods.push(path);
            });

            $("#path").typeahead({
                source: allMethods
            });
        }
    });

});

$("#submit-button").click(function (e) {
    e.preventDefault();

    var path = $("#path").val();
    if (path != null && path.length > 0) {
        path = "https://api.spiget.org/v2" + path;
        if (path.indexOf("?") > 0) {
            path = path + "&";
        } else {
            path = path + "?";
        }
        path = path + "callback=?";
        $.ajax({
            url: path,
            dataType: "jsonp",
            success: function (r) {
                $("#result").html("<pre>" + JSON.stringify(r, null, 4) + "</pre>");
            },
            error: function (r) {
                $("#result").html("<pre>" + JSON.stringify(r, null, 4) + "</pre>");
            }
        });
    }
});
