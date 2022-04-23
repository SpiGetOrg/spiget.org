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
            <div class="col-md-2">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- spiget status sidebar left -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2604356629473365"
                     data-ad-slot="3613794533"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
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
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <!-- spiget status sidebar right -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2604356629473365"
                     data-ad-slot="6494452201"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                <br/>

                <a class="twitter-timeline" data-width="400" data-height="1500" href="https://twitter.com/spiget_org?ref_src=twsrc%5Etfw">Tweets by spiget_org</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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
                name: "apple",
                color: "aqua",
                url: "https://apple.api.spiget.org",
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
