{extends "layout.tpl"}

{block name="style"}
    <link rel="stylesheet" href="/css/index.css">
{/block}

{block name="content"}
    <div style="height: 325px;">
        <h1 class="noselect" style="margin:auto;top:40%;position:relative;">Spig<span class="eo">o</span>t <strong>Resource</strong> and <strong>Author</strong> API</h1>

        <!-- Right Image -->
        <div class="hidden-xs hidden-sm">
            <span style="
                  position: absolute;
                  right: -1px;
                  background-color: orange;
                  height: 60px;
                  /*width: 263px;*/
                  width: 0px;
                  top: 279px;
                  " class="logo-pipe"></span>
            <img style="
                 position:absolute;
                 right:-100%;
                 " class="full-logo img-responsive" draggable="false" width="250" height="256" src="/img/logo-text-x256.png" alt="Spiget Logo">
        </div>
        <!-- End -->

        <div id="main_buttons" style="margin:auto;top:45%;position:relative;text-shadow: 1px 1px black;">
            <br/>
            <button class="btn btn-success" data-toggle="modal" data-target="#tryit-modal">
                <strong>Try It</strong>
            </button>
            <a href="/documentation" class="btn btn-primary">Documentation</a>
            &nbsp;
            <a href="/about" class="btn btn-primary">Learn More</a>
        </div>
    </div>
    <div id="stats">
        <h1 id="stats_title"><span class="glyphicon glyphicon-stats" style="padding-right: 10px;"></span>Stats</h1>
        <div id="stats-container">
            <div id="stats-scroller" style="height:160px;">
                <div class="row">
                    <div class="col-md-4 scroll-stat">
                        <div class="stat">
                            <h1 class="stat-value" id="stat_resources">0</h1>
                            <h1 class="stat-description"><strong>Resources</strong> released</h1>
                        </div>
                    </div>
                    <div class="col-md-4 scroll-stat">
                        <div class="stat">
                            <h1 class="stat-value" id="stat_authors">0</h1>
                            <h1 class="stat-description">Resource <strong>Authors</strong></h1>
                        </div>
                    </div>
                    <div class="col-md-4 scroll-stat">
                        <div class="stat">
                            <h1 class="stat-value" id="stat_daily_requests">0</h1>
                            <h1 class="stat-description">Daily <strong>API requests</strong></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden-sm hidden-xs" id="hidden_test"></div>
    </div>
    <div id="new-entries">
        <h1 id="new">Recently Updated <strong>Resources</strong> and <strong>Authors</strong></h1>
        <div id="new-entries-container">
            <div class="row">
                <div class="col-md-6" style="padding-bottom: 10px">
                    <span class="new-resources-icon glyphicon glyphicon-paperclip corner-icon corner-icon-left corner-icon-rounded"></span>
                    <ul id="new-resources" class="data-list new-resources">
                        <!---->
                    </ul>
                </div>
                <div class="col-md-6" style="padding-bottom: 10px">
                    <span class="new-authors-icon glyphicon glyphicon-user corner-icon corner-icon-left corner-icon-rounded"></span>
                    <ul id="new-authors" class="data-list new-resources">
                        <!---->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="supporters_container">
        <h1 id="supporters">Supporters</h1>

        <ul class="supporter-list">
            <li>
                <div class="well well-sm supporter-container">
                    <a href="https://jetbrains.com" target="_blank" class="supporter-image-link"><img src="/img/logo_JetBrains_2.svg" width="128" height="128" class="supporter-image" alt="JetBrains Logo"></a>
                    <a class="supporter-title" href="https://jetbrains.com" target="_blank"><h2>JetBrains</h2></a><a href="https://jetbrains.com" target="_blank"><strong>JetBrains'</strong></a> awesome software is used to develop Spiget and was provided for free via their <a href="https://www.jetbrains.com/buy/opensource/">open-source license</a>!
                </div>
            </li>
            <li>
                <div class="well well-sm supporter-container">
                    <a href="https://aternos.org" target="_blank" class="supporter-image-link"><img src="/img/aternos.png" width="128" height="128" class="supporter-image" alt="Aternos Logo"></a>
                    <a class="supporter-title" href="https://aternos.org" target="_blank"><h2>Aternos.org</h2></a><a href="https://aternos.org" target="_blank"><strong>Aternos</strong></a> kindly provided the API Server for Spiget!
                </div>
            </li>
            <li>
                <div class="well well-sm">
                    <a href="https://spiget.org/about"><img src="https://i.imgur.com/hP0fSUT.png" width="128" height="128" alt="?"></a>
                    <a href="mailto:staff@spiget.org"><strong>Do you want to be a supporter?</strong></a>
                </div>
            </li>
        </ul>
    </div>
    <!-- TryIt Modal -->
    <div class="modal fade" id="tryit-modal" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    Try it!
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="tryit-body">
                    Loading . . .
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{/block}

{block name="scripts"}
    <script async src="/js/stats.min.js?1"></script>
    <script async src="/js/eo.min.js"></script>
    <script async src="/js/bootstrap3-typeahead.min.js"></script>
    <script async src="/js/tryit-modal.min.js"></script>
    <script async src="/js/index-animation.min.js"></script>
{/block}
