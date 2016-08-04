{extends "layout.tpl"}

{block name="title"}
    <title>Live Status | Spiget</title>
{/block}
{block name="og_site_name"}
    <meta property="og:site_name" content="Live Status">
{/block}
{block name="twitter"}
    <meta name="twitter:title" content="Live Status | Spiget">
{/block}

{block name="style"}
    <link rel="stylesheet" href="/css/live-status.css">
    <style>
    </style>
{/block}

{block name="content"}
    <div>
        <div class="row">
            <div class="col-md-3" id="leftCol">

            </div>
            <div class="col-md-6"></div>
            <div class="col-md-3" id="rightCol">

            </div>
        </div>
    </div>
{/block}

{block name="scripts"}
    <script src="/js/moment.min.js"></script>
    <script src="/js/moment-duration.min.js"></script>
    <script async src="/js/live-status.min.js"></script>
{/block}
