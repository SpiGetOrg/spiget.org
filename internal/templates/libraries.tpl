{extends "layout.tpl"}

{block name="title"}<title>Libraries | Spiget</title>{/block}

{block name="style"}
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css" disabled>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/mono-blue.min.css">
{/block}

{block name="content"}
    <h1 class="page-header">Libraries</h1>
    <div>
        {foreach $libraries as $library}
            <h2 id="{$library.name}">{$library.name}</h2>
            {if isset($library.author)}
                <strong>Author</strong>
                &nbsp;
                {if isset($library.author.url)}
                    <a href="{$library.author.url}" target="_blank">
                {/if}
                {$library.author.name}
                {if isset($library.author.url)}
                    </a>
                {/if}
                <br/>
                <br/>
            {/if}
            {if isset($library.download)}
                <a href="{$library.download}" target="_blank"><strong><span class="glyphicon glyphicon-arrow-down" style="color: orange;"></span> Download here</strong></a>
                <br/>
            {/if}
            {if isset($library.source)}
                <a href="{$library.source}" target="_blank"><strong><span class="glyphicon glyphicon-file" style="color:orange;"></span> Source</strong></a>
                <br/>
            {/if}
            {if isset($library.codeExample)}
                <h3>Example Code</h3>
                <pre>
                <code class="external-code {$library.codeExample.language}" code-src="{$library.codeExample.url}"></code>
            </pre>
            {/if}
            <hr/>
            <br/>
        {/foreach}
    </div>
    <!-- Footer -->
    <br/>
    <h2>Submit your own Library/API</h2>
    To submit your own Library, edit
    <!-- TODO: add link -->
    <a href="#" target="_blank">
        <strong>this file on GitHub</strong> or <a href="https://twitter.com/intent/tweet?text=@Inventivtalent%20@spiget_org%20I%20want%20to%20submit%20a%20library%20for%20Spiget!">tweet @Inventivetalent</a>
    </a>
    and provide links to the source-code, a download and possibly an example :)
    <br/>
    <br/>
{/block}

{block name="scripts"}
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
    <script src="/js/code-loader.min.js"></script>
{/block}