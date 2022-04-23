<!DOCTYPE html>
<html {block name="ngApp"}{/block}>
<head>
    {block name="title"}
        <title>Spiget | API for Spigot Resources, Plugins and Authors</title>
    {/block}
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
        <meta name="description" content="Spiget is an API to quickly and easily get information about Spigot plugins, resources and authors">
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
        <meta property="og:title" content="Spiget | API for Spigot Resources, Plugins and Authors">
        {block name="og_site_name"}
            <meta property="og:site_name" content="Spiget | API for Spigot Resources, Plugins and Authors">
        {/block}
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://spiget.org/img/logo-text-centered-616x630.png">
        <meta property="og:description" content="Spiget is an API to quickly and easily get information about Spigot plugins, resources and authors">
        <meta property="og:url" content="https://spiget.org">
        <!-- Twitter -->
        {block name="twitter"}
            <meta name="twitter:title" content="Spiget | API for Spigot Resources, Plugins and Authors">
        {/block}
        <meta name="twitter:description" content="Spiget is an API to quickly and easily get information about Spigot plugins, resources and authors">
        <meta name="twitter:url" content="https://spiget.org">
        <meta name="twitter:site" content="@Spiget_org">
        <meta name="twitter:creator" content="@Inventivtalent">
        <meta name="twitter:card" content="summary">
        <meta name="robots" content="index, follow">
    {/block}
    {block name="meta"}
    {/block}

    <meta name="flattr:id" content="okelw0">

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
        <!-- End Cookie Consent plugin -->

        <script src="https://donorbox.org/install-popup-button.js" type="text/javascript" defer></script>
        <script> window.DonorBox = { widgetLinkClassName: 'custom-dbox-popup' } </script>

        <!-- Hotjar Tracking Code for https://spiget.org -->
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1028296,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        </script>

        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-2604356629473365",
                enable_page_level_ads: true
            });
        </script>
    {/literal}

</head>
{block name="navigation"}
    {include "navigation.tpl"}
{/block}

{block name="body"}
    <body>
    {block name="content-container"}
        <div class="container content-container">
            {block name="content"}
            {/block}
        </div>
    {/block}

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
<script src="https://platform.twitter.com/widgets.js"></script>
<script src="/js/js-cookie.min.js"></script>
<script async src="/js/cookiecounter.js"></script>
<script async src="/js/navigation-status.min.js"></script>

{literal}
    <script>
        window.DOP_config = {
            links: { // Replace with your links
                paypal: "https://paypal.me/inventivetalent",
                patreon: "https://patreon.com/inventivetalent"
            },
            enableAnalytics: true
        }
    </script>
    <script src="https://cdn.jsdelivr.net/gh/InventivetalentDev/DonationPopup@master/DonationPopup.min.js"></script>
{/literal}

{block name="scripts"}
{/block}
</html>
