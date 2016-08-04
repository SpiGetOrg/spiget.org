<form>
    <div class="row">
        <div class="col-md-10 col-xs-9">
            <input type="text" name="path" id="path" class="form-control" placeholder="/resources" value="/resources">
            <div class="help-block">
                Start typing to get a list of methods | Find a detailed method list <strong><a href="/documentation" target="_blank">here</a></strong>
            </div>
        </div>
        <div class="col-md-2 col-xs-3">
            <button type="submit" id="submit-button" class="btn btn-primary">
                Go!
            </button>
        </div>
    </div>
</form>
<hr/>

<div id="result-container">
    <div id="result">

    </div>
</div>
<script src="/js/bootstrap3-typeahead.min.js"></script>
<script src="/js/tryit.min.js"></script>