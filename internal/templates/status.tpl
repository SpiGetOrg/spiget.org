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
    <link rel="stylesheet" href="/css/status.min.css">
{/block}

{block name="content-container"}
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2"><!-- Placeholder --></div>
            <div class="col-md-7">
                <div id="api-status-panel" class="panel panel-warning">
                    <div class="panel-heading">
                        <strong class="status-title">API</strong> | <span id="api-status">Unknown</span>
                        <span class="pull-right"><a href="http://status.spiget.org?aff=38996" target="_blank" title="Website Uptime Monitoring"><img src="https://www.statuscake.com/App/button/index.php?Track=UQ279l6LKw&Days=30&Design=5" alt="Uptime"></a>&nbsp;
                <select id="api_version_selector" title="Stats API Version">
                    <option value="v1">https://api.spiget.org/v1</option>
                    <option selected value="v2">https://api.spiget.org/v2</option>
                </select>
            </span>
                    </div>
                    <div class="panel-body">
                        <div class="collapse out" aria-expanded="false" id="spigot_status_collapse">
                            <div class="panel panel-warning" id="spigot_status_panel">
                                <div class="panel-heading">
                                    <strong class="status-title">SpigotMC.org</strong> | <span id="spigot_status">Checking . . .</span><span class="pull-right"><a href="http://status.spigotmc.org" target="_blank"><i>Detailed Status</i></a></span>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div class="collapse out" aria-expanded="false" id="fetch_status_collapse">
                            <div class="fetch_status">
                                <h2>The API is <span id="fetch_status_fetching">Unknown</span></h2>
                                <br/>
                                <div id="fetch_status_lastUpdate_container" style="display:none;">
                                    It was last updated on <span id="fetch_status_lastUpdate" class="date"></span>
                                    <br/>
                                    It will update again in <span id="fetch_status_nextUpdate" class="hour">00:00</span><span id="fetch_status_nextUpdate_detail" class="hour" style="display:none;">00:00</span>
                                </div>
                                <div id="fetch_status_done_container" style="display:none;">
                                    It will be done in about <span id="fetch_status_done" class="hour">00:00</span><span id="fetch_status_done_detail" class="hour" style="display:none;">00:00</span>
                                </div>

                                <!--
                                <br>
                                <div class="alert alert-info">
                                The request tracker is currently being updated, so the data on here might look a bit messy at the moment :)
                                </div>
                                -->
                            </div>
                        </div>
                    </div>
                    <div class="collapse out" aria-expanded="false" id="daily_requests_collapse">
                        <hr/>
                        <div id="daily_requests_graph"></div>
                    </div>
                    <div class="collapse out" aria-expanded="false" id="method_requests_collapse">
                        <hr/>
                        <div id="method_requests_graph"></div>
                    </div>
                    <div class="collapse out" aria-expanded="false" id="user_agent_requests_collapse">
                        <hr/>
                        <div id="user_agent_requests_graph"></div>
                        <a href="#" id="user_agent_graph_expand">Click to expand Chart</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <a class="twitter-timeline" href="https://twitter.com/search?q=SpiGet" data-widget-id="807343265355862017" data-height="1500" data-width="400">Tweets about SpiGet</a>
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
    <script async src="/js/status.min.js?7"></script>
{/block}
