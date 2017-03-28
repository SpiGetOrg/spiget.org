{extends "layout.tpl"}

{block name="title"}
    <title>Status | Spiget</title>
{/block}
{block name="og_site_name"}
    <meta property="og:site_name" content="Status">
{/block}
{block name="twitter"}
    <meta name="twitter:title" content="Status | Spiget">
{/block}

{block name="style"}
    <style>
        .server {
            display: inline-block;
            margin: 8px;
            border-radius: 100% !important;
            width: 60px;
            height: 60px;
            font-size: 40px;
            line-height: 66.5px;
            text-align: center;

            border: 2px solid white;
        }

        .server.mode-master {
            border: 2px solid black;
        }

        .server.mode-slave {
            border: 2px solid lightgray;
        }

        .server .glyphicon {
        }

        .fetcher-status {
            font-size: 30px;
            font-weight: bold;
        }

        .fetcher-status .fetcher-updating {
            color: orange;
        }

        .fetcher-status .fetcher-updated {
            color: green;
        }

        .fetcher-details {
            font-size: 16px;
        }

        .fetcher-details .time {
            color: orange;
        }
    </style>
{/block}

{block name="content-container"}
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2"><!-- Placeholder --></div>
            <div class="col-md-7">
                <h1 class="page-header">Status</h1>

                <div id="api-status-panel" class="panel panel-warning container-fluid">
                    <div class="panel-heading row">
                        <div class="col-xs-10">
                            <strong class="status-title">API</strong> | <span id="api-status">Unknown</span>
                        </div>
                        <div class="col-xs-2">
                            <a href="http://status.spiget.org/" target="_blank" class="pull-right"><strong>Details</strong></a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="serverContainer">
                            <!-- Placeholder -->
                        </div>
                        <hr/>
                        <div>
                            <div class="fetcher-status" id="fetcher-status">
                                Checking Fetcher Status...
                            </div>
                            <div class="fetcher-details" id="fetcher-details">
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div id="daily_requests_graph"></div>
                            <hr/>
                            <div id="user_agent_requests_graph"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-md-3">
                <a class="twitter-timeline" href="https://twitter.com/search?q=%40spiget_org%20OR%20spiget.org%20OR%20%23SpiGet" data-widget-id="846360169080655872" data-height="1500" data-width="400">Tweets about SpiGet</a>
            </div>
        </div>
    </div>
{/block}

{block name="scripts"}
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/boost.js"></script>
    <script src="/js/moment.min.js"></script>
    <script src="/js/moment-duration.min.js"></script>
    <script src="/js/js-cookie.min.js"></script>
    <script src="/js/regression.js"></script>
    <script>
        window.SpigetStatusServers = [
            {
                name: "aqua",
                color: "aqua",
                url: "https://aqua.api.spiget.org",
                apiKey: "m778498607-51f8a0a2cba2102642c5264c"
            }
        ];
    </script>
    <script src="/js/status.js"></script>
    <script>
        $(document).ready(function () {
            window.SpigetStatus.checkServers();
            window.SpigetStatus.checkFetcher();
            window.SpigetStatus.drawCharts();
        });
    </script>
{/block}
