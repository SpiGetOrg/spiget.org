$(document).ready(function () {
    var apiVersion = Cookies.get("statsApiVersion");
    if (apiVersion === undefined) {
        apiVersion = "v2";
    }
    $("#api_version_selector").val(apiVersion);

    var urls = {
        status: "https://api.spiget.org/v2/status?spiget__ua=SpigetStatus&callback=?",
        spigot_status: "https://api.spiget.org/spigotStatus.php?spiget__ua=SpigetStatus&callback=?",
        metrics: "https://api.spiget.org/" + apiVersion + "/metrics/requests/30?spiget__ua=SpigetStatus&pretty=false"
    };
    var constant = {
        page_size: 20,
        seconds_per_resource: 20,
        update_interval: 2
    };

    var fullUaCookie = Cookies.get("showFullUserAgent");
    if (fullUaCookie === undefined || fullUaCookie !== "true") {
        urls.metrics += "&stripUaVersion=true";
    }
    var hourlyCookie = Cookies.get("hourlyRequests");
    if (hourlyCookie !== undefined && hourlyCookie === "true") {
        urls.metrics += "&hourly";
    }
    var forceLiveCooke = Cookies.get("forceLiveData");
    var forceLive = false;
    if (forceLiveCooke !== undefined && forceLiveCooke === "true") {
        urls.metrics += "&callback=?";
        forceLive = true;
    }

    $("#api_version_selector").change(function () {
        Cookies.set("statsApiVersion", $(this).val(), {expires: 356});
        location.reload();
    });

    checkStatus(2);

    function checkStatus(tryN) {
        panel = $("#api-status-panel");
        var statusText = $("#api-status");

        var pingStart = new Date().getTime();
        $.ajax({
            url: urls.status,
            dataType: "jsonp",
            success: function (status) {
                pingEnd = new Date().getTime();
                ping = pingEnd - pingStart;

                panel.addClass("panel-success");
                panel.removeClass("panel-warning");

                statusText.html("<strong>ONLINE</strong> API is up and reachable, ping: <code>" + ping + "</code> ms");

                updateSpigotStatus();
                updateFetcherStatus(status);
                updateMetrics(status);
            },
            error: function (error) {
                panel.addClass("panel-danger");
                panel.removeClass("panel-warning");

                statusText.html("<strong>OFFLINE</strong> Failed to connect to API");

                if (tryN > 0) {
                    setTimeout(function () {
                        checkStatus(tryN - 1);
                    }, 10000);
                }
            }
        });
    }

    function updateSpigotStatus() {
        $("#spigot_status_collapse").collapse("show");

        function online(status) {
            panel = $("#spigot_status_panel");
            statusText = $("#spigot_status");

            panel.addClass("panel-success");
            panel.removeClass("panel-warning");

            statusText.html("<strong>ONLINE</strong>");
        }

        function offline(status) {
            panel = $("#spigot_status_panel");
            statusText = $("#spigot_status");

            panel.addClass("panel-danger");
            panel.removeClass("panel-warning");

            statusText.html("<strong>OFFLINE</strong> The API could not reach the Spigot site. Last checked: " + moment.duration(moment(status.time).diff(moment())).humanize() + " ago");

            var pingStart = new Date().getTime();
            $.ajax({
                url: "https://spigotmc.org",
                success: function (status) {
                    pingEnd = new Date().getTime();
                    ping = pingEnd - pingStart;

                    panel.addClass("panel-success");
                    panel.removeClass("panel-warning");

                    statusText.html("<strong>ONLINE</strong> The API wasn't able to rech the Spigot site, but it seems to be online, ping: <code>" + ping + "</code> ms");

                    updateSpigotStatus();
                    updateMetrics(status);
                },
                error: function (error) {
                }
            });
        }


        $.ajax({
            url: urls.spigot_status,
            dataType: "jsonp",
            success: function (status) {
                if (status.online) {
                    online(status);
                } else {
                    offline(status);
                }
            },
            error: function (error) {
                offline(error);
            }
        });
    }

    function updateFetcherStatus(status) {
        $("#fetch_status_collapse").collapse("show");

        fetch_status_fetching = $("#fetch_status_fetching");

        fetch_status_lastUpdate_container = $("#fetch_status_lastUpdate_container");
        fetch_status_lastUpdate = $("#fetch_status_lastUpdate");

        fetch_status_nextUpdate = $("#fetch_status_nextUpdate");
        fetch_status_nextUpdate_detail = $("#fetch_status_nextUpdate_detail");

        fetch_status_done_container = $("#fetch_status_done_container");
        fetch_status_done = $("#fetch_status_done");
        fetch_status_done_detail = $("#fetch_status_done_detail");

        fetch_status_nextUpdate.click(function () {
            fetch_status_nextUpdate.hide();
            fetch_status_nextUpdate_detail.show();
        });
        fetch_status_nextUpdate_detail.click(function () {
            fetch_status_nextUpdate_detail.hide();
            fetch_status_nextUpdate.show();
        });

        fetch_status_done.click(function () {
            fetch_status_done.hide();
            fetch_status_done_detail.show();
        });
        fetch_status_done_detail.click(function () {
            fetch_status_done_detail.hide();
            fetch_status_done.show();
        });

        if (status.status.fetch.active) {
            fetch_status_fetching.html("currently updating");
            fetch_status_fetching.addClass("updating");

            fetch_status_done_container.show();

            doneTime = moment().add(status.status.fetch.page.amount * constant.page_size * constant.seconds_per_resource, "seconds");

            function updateDone() {
                duration = moment.duration(doneTime.diff(moment()));
                diffFormatted = duration.humanize();
                diffFormattedDetailed = duration.format("HH:mm");

                fetch_status_done.html(diffFormatted);
                fetch_status_done.attr("title", diffFormattedDetailed);
                fetch_status_done_detail.html(diffFormattedDetailed);

                setTimeout(function () {
                    if (diffFormattedDetailed.indexOf("-") == 0) {
                        location.reload();
                    }
                    updateDone();
                }, 60000);
            }

            updateDone();
        } else {
            fetch_status_fetching.html("up to date");
            fetch_status_fetching.addClass("updated");

            fetch_status_lastUpdate_container.show();

            endDate = moment.unix(status.status.fetch.end / 1000);
            endDate = endDate.startOf("hour");

            fetch_status_lastUpdate.html(endDate.format("YYYY-MM-DD HH:mm:ss Z"));

            nextTime = endDate.add(constant.update_interval, "hours");

            function updateNext() {
                duration = moment.duration(nextTime.diff(moment()));
                diffFormatted = duration.humanize();
                diffFormattedDetailed = duration.format("HH:mm:ss");

                fetch_status_nextUpdate.html(diffFormatted);
                fetch_status_nextUpdate.attr("title", diffFormattedDetailed);
                fetch_status_nextUpdate_detail.html(diffFormattedDetailed);

                setTimeout(function () {
                    if (diffFormattedDetailed.indexOf("-") == 0) {
                        location.reload();
                    }
                    updateNext();
                }, 10000);
            }

            updateNext();

        }
    }

    function updateMetrics(status) {
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
            url: urls.metrics,
            dataType: forceLive ? "jsonp" : "json",
            success: function (requests) {
                var totalRequests = new Array();
                var userAgents = new Array();
                var methods = new Array();
                $.each(requests, function (key, value) {
                    keyName = " " + key.toString() + " ";
                    totalRequests[keyName] = value.total;

                    $.each(value.user_agents, function (agent, amount) {
                        if (userAgents[agent] == undefined) {
                            userAgents[agent] = new Array();
                        }
                        userAgents[agent][keyName] = amount;
                    });
                    $.each(value.methods, function (method, amount) {
                        //Replace the API version
                        method = method.replace("v2/", "").replace("v2"/*For the root path*/, "");
                        if (methods[method] == undefined) {
                            methods[method] = new Array();
                        }
                        methods[method][keyName] = amount;
                    });
                });

                //Daily requests
                $("#daily_requests_collapse").collapse("show");
                var dailySeries = [];
                for (var key in totalRequests) {
                    value = totalRequests[key];
                    key = parseInt(key.trim());

                    if (value > 0) {
                        date = key * 1000;
                        dailySeries.push([date, value]);
                    }
                }

                $("#daily_requests_graph").highcharts({
                    chart: {
                        type: "spline",
                        zoomType: "x"
                    },
                    legend: {
                        enabled: false
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
                    series: [
                        {
                            name: "total",
                            data: dailySeries
                        }, {
                            name: "average",
                            data: (function() {
                                return fitData(dailySeries).data;
                            })()
                        }
                    ]
                });

                //User-Agent requests
                $("#user_agent_requests_collapse").collapse("show");
                var userAgentSeries = new Array();
                for (var key in userAgents) {
                    value = userAgents[key];

                    var userAgentData = new Array();
                    for (var key1 in value) {
                        value1 = value[key1];
                        key1 = parseInt(key1.trim());

                        date = key1 * 1000;
                        userAgentData.push([date, value1]);
                    }
                    ;
                    userAgentSeries.push({
                        name: key,
                        data: userAgentData
                    });
                }
                ;
                $("#user_agent_requests_graph").highcharts({
                    chart: {
                        type: "spline",
                        zoomType: "x"
                    },
                    legend: {
                        enabled: Cookies.get("enableLegend") === "true"
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
                        text: "Requests per User-Agent"
                    },
                    xAxis: {
                        type: "datetime"
                    },
                    yAxis: {
                        title: {
                            text: "Number of Requests"
                        },
                        min: 0
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
                    series: userAgentSeries
                });

                //Method requests
                $("#method_requests_collapse").collapse("show");
                var methodSeries = new Array();
                for (var key in methods) {
                    value = methods[key];

                    var methodData = new Array();
                    for (var key1 in value) {
                        value1 = value[key1];
                        key1 = parseInt(key1.trim());

                        date = key1 * 1000;
                        methodData.push([date, value1]);
                    }
                    ;
                    methodSeries.push({
                        name: key,
                        data: methodData
                    });
                }
                ;
                $("#method_requests_graph").highcharts({
                    chart: {
                        type: "spline",
                        zoomType: "x"
                    },
                    legend: {
                        enabled: Cookies.get("enableLegend") === "true"
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
                        text: "Requests per Method"
                    },
                    xAxis: {
                        type: "datetime"
                    },
                    yAxis: {
                        title: {
                            text: "Number of Requests"
                        },
                        min: 0
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
                    series: methodSeries
                });
            }
        });

    }


    $("#user_agent_graph_expand").click(function (e) {
        e.preventDefault();

        $("#user_agent_requests_graph").highcharts().setSize($($("#user_agent_requests_graph").highcharts().container).width(), 1000);
    });
});
