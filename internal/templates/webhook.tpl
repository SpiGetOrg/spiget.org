{extends "layout.tpl"}

{block name="title"}<title>Webhooks | Spiget</title>{/block}

{block name="style"}
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css" disabled>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/mono-blue.min.css">
{/block}

{block name="content"}
    <h1 class="page-header">Webhooks</h1>
    <div>
        You can register <strong>Webhooks</strong> which are triggered for certain update-events.
        <br/>
        The URL specified will receive a JSON
        <code>
            POST
        </code>
        request as soon as a resource update has been detected (every ~2 hours).
        <br/>
        <br/>
        Currently, these events are available:
        <ul>
            <li>
                <code>
                    resource-update
                </code>
            </li>
            <li>
                <code>
                    new-resource
                </code>
            </li>
            <li>
                <code>
                    new-author
                </code>
            </li>
        </ul>
        <br/>
        Feel free to request more events via the <a href="/issues" target="_blank">Issue Tracker</a>.
        <br/>

        <strong>Example POST:</strong>
        <pre>
		<code class="external-code json" data-code-src="/code/webhook-example-resource.txt"></code>
        </pre>
        <br/>
        <br/>

        Use the <strong>/webhook/register</strong> method, or the form below to create a new Webhook registration.
        <br/>

    </div>
    <hr/>
    <div>
        <h2 id="register">Register Webhook</h2>

        <form>
            <div class="input-group" style="width:100%">
                <label>Target URL</label>
                <input type="url" class="form-control" id="targetUrl">
                <span class="help-block">The URL the POST-Requests are sent to</span>
            </div>
            <div class="input-group">
                <label>Subscribed Events</label>
                <div id="events_group"></div>
            </div>

            <br/>
            <button class="btn btn-success" id="registerButton" disabled>
                Register Webhook
            </button>
            <hr/>

            <div class="input-group" style="width:50%">
                <label>Webhook ID</label>
                <input type="text" class="form-control" id="webhookId" readonly>
                <span class="help-block">Unique ID of the Webhook</span>
            </div>
            <div class="input-group" style="width:50%">
                <label>Secret</label>
                <input type="text" class="form-control" id="webhookSecret" readonly>
                <span class="help-block">Secret for the Webhook - used to edit/delete</span>
            </div>
        </form>

        <hr/>
        <br/>

        <h2 id="delete">Delete Webhook</h2>

        <form>
            <div class="input-group" style="width:50%">
                <label>ID</label>
                <input type="text" class="form-control" id="delete-id">
            </div>
            <div class="input-group" style="width:50%">
                <label>Secret</label>
                <input type="text" class="form-control" id="delete-secret">
            </div>

            <br/>
            <br/>
            <button class="btn btn-danger" id="deleteButton" disabled>
                Delete Webhook
            </button>
        </form>
    </div>
    <br/>
{/block}

{block name="scripts"}
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
    <script src="/js/code-loader.min.js"></script>
    <script src="/js/webhook-editor.min.js"></script>
{/block} 