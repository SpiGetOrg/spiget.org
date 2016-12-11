{extends "layout.tpl"}

{block name="title"}<title>About | Spiget</title>{/block}
{block name="og_site_name"}
    <meta property="og:site_name" content="About">
{/block}
{block name="twitter"}
    <meta name="twitter:title" content="About | Spiget">
{/block}

{block name="content"}
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
            Join the IRC below or send an email to <a href="mailto:staff@spiget.org">staff@spiget.org</a>

            <iframe src="https://kiwiirc.com/client/irc.spi.gt/#spiget" style="border:0; width:100%; height:450px;"></iframe>
        </div>
        <br/>
    </div>
    <div>
        <a class="twitter-timeline" href="https://twitter.com/search?q=SpiGet" data-widget-id="807343265355862017">Tweets about SpiGet</a>
    </div>
{/block}
{block name="scripts"}
    <script src="https://platform.twitter.com/widgets.js"></script>
{/block}
