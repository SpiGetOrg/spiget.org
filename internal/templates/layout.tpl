<!DOCTYPE html>
<html {block name="ngApp"}{/block}>
<head>
    {block name="title"}
        <title>Spiget | Spigot Resource &amp; Author API</title>
    {/block}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="shortcut icon" type="image/png" href="/img/favicon.png">

    <link rel="dns-prefetch" href="//inventivetalent.org">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//code.highcharts.com">


    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/bootstrap-glyphicons.min.css">
    <link rel="stylesheet" href="/css/custom-bootstrap.min.css">
    <link rel="stylesheet" href="/css/navigation.min.css">
    <link rel="stylesheet" href="/css/sticky-footer.min.css">

    <link rel="stylesheet" href="/css/rpm.css">

    {block name="style"}
    {/block}

    {block name="default_meta"}
        <meta name="keywords" content="spiget,spigot,minecraft,server,bukkit,api,plugin,author,resource,spigotmc">
        <meta name="description" content="API to quickly and easily get informations about Spigot plugins and authors">
        <meta name="author" content="inventivetalent">
        <!-- Theme Color (https://stackoverflow.com/questions/26960703/how-to-change-the-color-of-header-bar-and-address-bar-in-newest-android-chrome-v) -->
        <!-- Chrome, Firefox OS and Opera -->
        <meta name="theme-color" content="orange">
        <!-- Windows Phone -->
        <meta name="msapplication-navbutton-color" content="orange">
        <!-- iOS Safari -->
        <meta name="apple-mobile-web-app-status-bar-style" content="orange">
        <!-- /Theme Color -->

        <!-- OG -->
        <meta property="og:title" content="Spiget">
        {block name="og_site_name"}
            <meta property="og:site_name" content="Spiget">
        {/block}
        <meta property="og:type" content="website">
        <meta property="og:image" content="/img/logo-text-centered-616x630.png">
        <meta property="og:description" content="API to quickly and easily get informations about Spigot plugins and authors">
        <meta property="og:url" content="https://spiget.org">
        <!-- Twitter -->
        {block name="twitter"}
            <meta name="twitter:title" content="Spiget">
        {/block}
        <meta name="twitter:description" content="API to quickly and easily get informations about Spigot plugins and authors">
        <meta name="twitter:url" content="https://spiget.org">
        <meta name="twitter:site" content="@Spiget_org">
        <meta name="twitter:creator" content="@Inventivtalent">
        <meta name="twitter:card" content="summary">
    {/block}
    {block name="meta"}
    {/block}

    <!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
    {literal}
        <script type="text/javascript">
            window.cookieconsent_options = {
                message: "This website uses cookies to ensure you get the best experience on our website",
                dismiss: "Got it!",
                learnMore: "More info",
                link: null,
                theme: "dark-floating"
            };
        </script>
    {/literal}
    <!-- End Cookie Consent plugin -->

</head>
{block name="navigation"}
    {include "navigation.tpl"}
{/block}

{block name="body"}
    <body>
    <div class="container content-container">
        {block name="content"}
        {/block}
    </div>

    <!--
    _____       _  _____      _
    / ____|     (_)/ ____|    | |
    | (___  _ __  _| |  __  ___| |_   ___  _ __ __ _
    \___ \| '_ \| | | |_ |/ _ \ __| / _ \| '__/ _` |
    ____) | |_) | | |__| |  __/ |_ | (_) | | | (_| |
    |_____/| .__/|_|\_____|\___|\__(_)___/|_|  \__, |
    | |                                  __/ |
    |_|                                 |___/

    -->

    <!-- Temporary V2 update note -->
    <div class="alert alert-info" style="z-index: 200;position: fixed;left: 20px;bottom: 20px; display:none;" id="v2ReleaseAlert">
        <a href="#" class="close" aria-label="close" data-dismiss="alert" id="v2ReleaseAlertDismiss">×</a>
        <span style="color:rgb(0, 18, 62);">Spiget Version 2 has been released! Go and update your things :) | <a
                    href="/documentation"><strong>Documentation</strong></a></span>
    </div>

    {block name="footer"}
        {include "footer.tpl"}
    {/block}
    </body>
{/block}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.9/cookieconsent.min.js"></script>
<!-- End Cookie Consent plugin -->

<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/navigation.min.js"></script>
<script src="/js/alert.min.js"></script>
<script async src="/js/twitter-widget.js"></script>
<script src="/js/js-cookie.min.js"></script>
<script async src="/js/rpm.min.js"></script>
<script async src="/js/cookiecounter.js"></script>

{literal}
    <script>
        if (Cookies.get("v2ReleaseInfoSeen") === undefined) {
            $("#v2ReleaseAlert").fadeIn();
        }
        $("#v2ReleaseAlertDismiss").click(function () {
            Cookies.set("v2ReleaseInfoSeen", "true", {expires: 356});
        });
    </script>
{/literal}

{block name="scripts"}
{/block}
<script type="text/javascript">var SC_RumID = 5917;</script>
<script type="text/javascript" async src="https://www.statuscake.com/App/RUM/embed.js"></script>
</html>