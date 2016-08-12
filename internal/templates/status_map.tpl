{extends "layout.tpl"}

{block name="title"}
    <title>Status Map | Spiget</title>
{/block}

{block name="content"}
    <div id="map">Loading Map...</div>
{/block}

{block name="scripts"}
    <script src="https://code.highcharts.com/maps/highmaps.js"></script>
    <script src="https://code.highcharts.com/maps/modules/data.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/world.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/world-palestine.js"></script>
    <script async src="/js/status-map.js?8"></script>
{/block}
