$(document).ready(function () {
    $("#map").parent().removeClass("container");

    function refreshSize() {
        if ($("#map").highcharts() !== undefined) {
            $("#map").highcharts().setSize($("#map").parent().width(), ($(document).height() - 200))
        }
    }

    $(window).on("resize", function () {
        refreshSize();
    });


    Alert.alert("info", "Loading Map...", true);

    $.ajax({
        url: "https://api.spiget.org/v2/metrics/map/30?spiget__ua=SpigetStatusMap&callback=?",
        dataType: "jsonp",
        success: function (data) {
            Alert.alert("info", "", false);

            console.log(data);
            $.each(data, function () {
                this.code = this.code.toUpperCase();
            });

            $("#map").highcharts("Map", {
                title: {
                    text: "Requests per Country"
                },
                subtitle: {
                    text: "(Last Month)"
                },
                mapNavigation: {
                    enabled: true
                },
                colorAxis: {
                    min: 0
                },
                series: [{
                    data: data,
                    mapData: Highcharts.maps["custom/world"],
                    name: "Requests",
                    joinBy: ['iso-a2', 'code'],
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}"
                    }
                }]
            });

            refreshSize();
        },
        error: function () {
            Alert.alert("danger", "Failed to load Map. Please try again later.", true);
        }
    });
});