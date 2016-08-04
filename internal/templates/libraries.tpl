{extends "layout.tpl"}

{block name="title"}<title>Libraries | Spiget</title>{/block}

{block name="style"}
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css" disabled>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/mono-blue.min.css">
{/block}

{block name="content"}
    <h1 class="page-header">Libraries</h1>
    <!-- Java -->
    <h2 id="Java">Java</h2>
    <a href="https://github.com/InventivetalentDev/SpigetJavaClient/releases" target="_blank"><strong><span class="glyphicon glyphicon-arrow-down" style="color: orange;"></span> Download here</strong></a>
    <br/>
    <a href="https://github.com/InventivetalentDev/SpigetJavaClient" target="_blank"><strong><span class="glyphicon glyphicon-file" style="color:orange;"></span> Source</strong></a>
    <br/>
    <h3>Example Code</h3>
    <pre>
        <code class="external-code java" code-src="/code/java-api-example.txt"></code>
    </pre>
    <hr/>
    <br/>
    <!-- /Java -->


    <!-- Footer -->
    <br/>
    <h2>Submit your own Library/API</h2>
    <a href="mailto:staff@spiget.org"><strong>Click here</strong></a>
    to submit your own library. Please make sure to include a download link, the source link (Bitbucket / Github) and a code example.
    <br/>
    <br/>
{/block}

{block name="scripts"}
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
    <script src="/js/code-loader.min.js"></script>
{/block}