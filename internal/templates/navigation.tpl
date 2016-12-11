<nav id="main_nav" class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header" style="height: 100px">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="https://spiget.org">
                <div class="logo-container">
                    <img alt="Spiget Logo" draggable="false" class="logo" width="64" height="64"
                         src="/img/logo-plain-x64.png">
                    <h1 class="spiget-text"><strong><span class="spiget-spi">spi</span><span class="spiget-get">g<span
                                        class="oe">e</span>t</span><!--BETA--><span class="spiget-beta">beta</span>
                            <!--/BETA--></strong></h1>
                </div>
            </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" aria-expanded="false">
            <ul class="nav navbar-nav navbar-right">
                <li class="{if $pageid=='documentation'}active{/if}">
                    <a class="nav-link" href="/documentation/"
                       title="API Documentation">Documentation</a>
                </li>
                <li class="{if $pageid=='search'}active{/if}">
                    <a class="nav-link" href="/search/" title="Search for Resources and Authors">Search</a>
                </li>
                <li class="{if $pageid=='status'}active{/if}">
                    <a class="nav-link" href="/status/" title="API Status and Statistics">Status <span id="navigation-status-icon" class="glyphicon glyphicon-info-sign"></span></a>
                </li>
                <li class="{if $pageid=='libraries'}active{/if}">
                    <a class="nav-link" href="/libraries"
                       title="Libraries for making requests to the API">Libraries</a>
                </li>
                <li class="{if $pageid=='about'}active{/if}">
                    <a class="nav-link" href="/about/" title="About this project">About</a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a class="nav-link" href="https://x.spiget.org" target="_blank">URL Shortener</a></li>
                        <li><a class="nav-link" href="https://spiget.org/webhook">Webhook Editor</a></li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link" id="donate-link" href="https://donation.inventivetalent.org/spiget"
                       title="Donate to keep this project running!" target="_blank">Donate ❤</a>
                </li>
            </ul>
        </div>
    </div>

    <!-- Progress bar -->
    <div id="header_pbar_container" class="progress" style="display:none;">
        <div id="header_pbar" class="progress-bar progress-bar-info" role="progressbar" aria-valuemin="0"
             aria-valuemax="100"></div>
    </div>
    <!-- Progress bar end -->
</nav>

<!-- Alerts -->
<div class="container">
    <div id="header_alert" class="alert alert-info" style="display:none;">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <span id="header_alert_value"></span>
    </div>
</div>
<!-- Alerts end -->

