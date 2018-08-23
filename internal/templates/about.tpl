{extends "layout.tpl"}

{block name="title"}<title>About | Spiget</title>{/block}
{block name="og_site_name"}
    <meta property="og:site_name" content="About">
{/block}
{block name="twitter"}
    <meta name="twitter:title" content="About | Spiget">
{/block}

{block name="content-container"}
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2"><!-- Placeholder --></div>
            <div class="col-md-6">
                <h1 class="page-header">About</h1>
                <div style="font-size: 16px">
                    Spig<span class="oe">e</span>t is a JSON Information API for Spig<span class="oe">o</span>t <strong>Resources/Plugins</strong> and <strong>Authors</strong>
                    <br/>
                    The data is loaded and updated from the SpigotMC site every <span class="js-value" data-value="update-interval">2</span> hours.
                    <br/>

                    It loads all resources of the first <span class="js-value" data-value="updates-pages">5</span> resource-pages by default.
                    It also updates the authors and versions of those resources.
                    <br/>

                    <br/>
                    Make sure to follow <a target="_blank" href="https://twitter.com/Spiget_org"><strong>@Spiget</strong></a> and <a target="_blank" href="https://twitter.com/inventivtalent"><strong>@inventivetalent</strong></a> on twitter to get the latest updates.
                    <br/>
                    You should also check out <a target="_blank" href="https://www.spigotmc.org/threads/api-spiget-beta.104454/">the SpigotMC thread</a>, if you're interested in the change log.
                    <br/>

                    <br/>
                    <strong>This project is currently in BETA, so its functionality and availability is not guaranteed yet.</strong>
                    <br/>
                    <strong>Please feel free to report issues or suggest features using the <a target="_blank" href="/issues">Issue Tracker</a>.</strong>
                    <br/>
                </div>
                <div>
                    <h2>Contributing</h2>
                    <div style="font-size:16px">
                        <strong>This project is open-source!</strong>
                        <br/>
                        All repositories for the <a href="https://github.com/SpiGetOrg/RestAPI" target="_blank">API</a>, <a href="https://github.com/SpiGetOrg/spiget.org" target="_blank">Website</a>, <a href="https://github.com/SpiGetOrg/SpigetFetcher" target="_blank">Fetcher</a> and <a href="https://github.com/SpiGetOrg/Documentation" target="_blank">Documentation</a> are located
                        <a href="https://github.com/spigetorg" target="_blank">on GitHub.</a>
                    </div>
                    <br/>
                </div>
                <div>
                    <h2>Feature Requests <span class="text-muted">|</span> Bug Reports</h2>
                    <div style="font-size:16px">
                        If you would like to suggest a feature or if you found a Bug,
                        <br/>
                        please use the <a target="_blank" href="/issues">Issue Tracker</a> to submit them.
                    </div>
                    <br/>
                </div>
                <div>
                    <h2>Contact</h2>
                    <div style="font-size:16px">
                        <strong>Do you still have questions?</strong>
                        <br/>
                        Join the Discord or IRC below

                       <div>
                           <br/>
                           <div>
                               <iframe src="https://discordapp.com/widget?id=398243219961413653&theme=light" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
                           </div>
                           <br/>
                           <div>
                               <iframe src="https://kiwiirc.com/client/irc.spi.gt/#spiget" style="border:0; width:100%; height:450px;"></iframe>
                           </div>
                       </div>
                    </div>
                    <br/>
                </div>
            </div>
            <div class="col-md-4">
                <a class="twitter-timeline" href="https://twitter.com/search?q=%40spiget_org%20OR%20spiget.org%20OR%20%23SpiGet" data-widget-id="846360169080655872" data-height="1000">Tweets about SpiGet</a>
            </div>
        </div>
    </div>
{/block}
