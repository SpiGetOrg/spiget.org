window.SpigetStatus = {
    options: {
        icons: {
            checking: "glyphicon glyphicon-question-sign",// Checking if the API is online
            up: "glyphicon glyphicon-ok-sign",// API is online
            down: "glyphicon glyphicon-remove-sign"// API is offline
        },
        colors: {
            checking: "gray",
            up: "#00b900",
            down: "red"
        }
    },
    display: {
        checking: function (element) {
            element.removeClass();
            element.css("color", window.SpigetStatus.options.colors.checking);
            element.addClass(window.SpigetStatus.options.icons.checking);
        },
        up: function (element) {
            element.removeClass();
            element.css("color", window.SpigetStatus.options.colors.up);
            element.addClass(window.SpigetStatus.options.icons.up);
        },
        down: function (element) {
            element.removeClass();
            element.css("color", window.SpigetStatus.options.colors.down);
            element.addClass(window.SpigetStatus.options.icons.down);
        }
    },
    servers: window.SpigetStatusServers || [],
    checkServers: function () {
        var onlineCount = 0;
        $.each(window.SpigetStatus.servers, function (index, server) {
            var serverElement = $("<div style='color:darkgray;' class='server'></div>");
            var serverLink = $("<a href='#' target='_blank'></a>");
            var statusElement = $("<i style='color:gray;' class='glyphicon'></i>");

            statusElement.appendTo(serverLink);
            serverLink.appendTo(serverElement);
            serverElement.appendTo($("#serverContainer"));

            serverElement.css("background", server.color);
            window.SpigetStatus.display.checking(statusElement);

            serverLink.attr("title", server.name);
            serverLink.attr("href", server.url);

            if (server.apiKey) {
                $.ajax({
                    method: 'POST',
                    url: "https://api.uptimerobot.com/v2/getMonitors?format=json&api_key=" + server.apiKey,
                    dataType: "json",
                    success: function (response) {
                        console.log(response)

                        var status = response.monitors.monitor[0];
                        var statusCode = status.status;
                        if (statusCode <= 2) {
                            window.SpigetStatus.display.up(statusElement);

                            onlineCount++;
                            window.SpigetStatus.refreshGlobalStatus(onlineCount);
                        } else {
                            window.SpigetStatus.display.down(statusElement);
                        }
                    },
                    error: function (xhr, status, error) {
                        window.SpigetStatus.display.down(statusElement);
                        console.log(error)
                    }
                });
            } else {
                console.warn("Server " + server.name + " does not have an API-Key");
                setTimeout(function () {
                    window.SpigetStatus.display.down(statusElement);
                }, Math.floor(Math.random() * (2000 - 500)) + 500);
            }

            if (server.url) {
                $.ajax({
                    url: server.url + "/v2/status?callback=?",
                    success: function (response) {
                        serverElement.addClass("mode-" + response.status.server.mode);
                    }
                })
            }
        });
    },
    refreshGlobalStatus: function (onlineCount) {
        $("#api-status").text(onlineCount + "/" + window.SpigetStatus.servers.length + " servers online");
        if (onlineCount >= window.SpigetStatus.servers.length) {
            $("#api-status-panel").removeClass("panel-warning");
            $("#api-status-panel").removeClass("panel-danger");
            $("#api-status-panel").addClass("panel-success");
            $("#api-status").text("All servers online!");
        } else if (onlineCount <= 0) {
            $("#api-status-panel").removeClass("panel-warning");
            $("#api-status-panel").addClass("panel-danger");
            $("#api-status").text("All servers are offline");
        }
    },
    checkFetcher: function () {
        $.ajax({
            url: "https://api.spiget.org/v2/status",
            success: function (response) {
                if (response.status.fetch.active) {
                    $("#fetcher-status").html("The API is <span class='fetcher-updating'>currently updating</span>");
                    $("#fetcher-details").html("The update started <span class='time'>" + moment(response.status.fetch.start).fromNow() + "</span>");
                } else {
                    $("#fetcher-status").html("The API is <span class='fetcher-updated'>up to date</span>");
                    $("#fetcher-details").html("It was last updated <span class='time'>" + moment(response.status.fetch.start).fromNow() + "</span>");
                }
            }
        })
    },
    drawCharts: function () {
        var seriesFormatter = function () {
            var a = [];
            var pointsS = this.points.sort(function (a, b) {
                return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
            });
            $.each(pointsS, function (index, point) {
                a.push('<span style="color:' + point.series.color + ';">' + point.series.name + '</span>: <strong>' + Highcharts.numberFormat(point.y, -1) + '</strong>');
            });
            var s = '<span style="font-size:12px" class="text-muted">' + moment(this.x).format("dddd, MMMM Do YYYY - HH:00") + '</span><br/>';
            s += a.join("<br/>");
            return s;
        };

        $.ajax({
            url: "https://api.spiget.org/v2/metrics/requests/30",
            success: function (response) {
                console.log(response)

                var dailyData = {
                    total: [],
                    unique: []
                };
                var userAgentData = {
                    Spiget: []
                };

                $.each(response, function (index, data) {
                    var timestamp = data.timestamp * 1000;
                    dailyData["total"].push([timestamp, data.total]);
                    dailyData["unique"].push([timestamp, data.unique]);

                    // $.each(data.userAgents, function (userAgent, userAgentCount) {
                    //     if (userAgentData[userAgent] === undefined) {
                    //         userAgentData[userAgent] = [];
                    //     }
                    //     userAgentData[userAgent].push([timestamp, userAgentCount]);
                    // });
                });

                var dailySeries = [
                    {
                        name: "total",
                        color: "black",
                        data: dailyData["total"]
                    },
                    {
                        name: "unique",
                        color: "blue",
                        visible: false,
                        data: dailyData["unique"]
                    },
                    {
                        name: "trend",
                        color: "gray",
                        data: (function () {
                            return fitData(dailyData["total"]).data;
                        })()
                    }
                ];

                // var userAgentSeries = [];
                // $.each(userAgentData, function (userAgent, data) {
                //     userAgentSeries.push({
                //         name: userAgent,
                //         data: data
                //     });
                // });

                $("#daily_requests_graph").highcharts({
                    chart: {
                        type: "spline",
                        zoomType: "x",
                        height: 500
                    },
                    legend: {
                        enabled: true
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    title: {
                        text: "Daily Requests"
                    },
                    xAxis: {
                        type: "datetime"
                    },
                    yAxis: {
                        title: {
                            text: "Number of Requests"
                        }
                    },
                    tooltip: {
                        backgroundColor: {
                            linearGradient: [0, 0, 0, 60],
                            stops: [[0, '#FFFFFF'], [1, '#E0E0E0']]
                        },
                        crossshairs: [true, true],
                        shared: true,
                        followPointer: true,
                        followTouchMove: true,
                        formatter: seriesFormatter,
                        useHTML: true
                    },
                    series: dailySeries
                });

                // $("#user_agent_requests_graph").highcharts({
                //     chart: {
                //         type: "spline",
                //         zoomType: "x",
                //         height: 800
                //     },
                //     legend: {
                //         enabled: true
                //     },
                //     plotOptions: {
                //         series: {
                //             marker: {
                //                 enabled: false,
                //                 symbol: 'circle',
                //                 states: {
                //                     hover: {
                //                         enabled: true
                //                     }
                //                 }
                //             }
                //         }
                //     },
                //     title: {
                //         text: "Requests per User-Agent"
                //     },
                //     xAxis: {
                //         type: "datetime"
                //     },
                //     yAxis: {
                //         title: {
                //             text: "Number of Requests"
                //         },
                //         min: 0
                //     },
                //     tooltip: {
                //         backgroundColor: {
                //             linearGradient: [0, 0, 0, 60],
                //             stops: [[0, '#FFFFFF'], [1, '#E0E0E0']]
                //         },
                //         crossshairs: [true, true],
                //         shared: true,
                //         followPointer: true,
                //         followTouchMove: true,
                //         formatter: seriesFormatter,
                //         useHTML: true
                //     },
                //     series: userAgentSeries
                // });
            }
        });
    }
}
