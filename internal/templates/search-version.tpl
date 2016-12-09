{extends "layout.tpl"}

{block name="ngApp"}ng-app="searchApp"{/block}

{block name="title"}
    <title>Version Search | Spiget</title>
{/block}

{block name="style"}
    <link rel="stylesheet" href="/css/search.min.css">
{/block}

{block name="content"}
{literal}
    <h1 class="page-header">Version Search</h1>
    <div ng-controller="SearchController as ctrl">
        <form>
            <div class="well">
                <div class="content row">
                    <div class="col-md-4">
                        <select class="form-control" ng-model="ctrl.method" ng-change="ctrl.doSearch()">
                            <option value="any">Compatible with any version</option>
                            <option value="all">Compatible with all versions</option>
                        </select>
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" type="text" placeholder="Versions separated by commas (for example: 1.7,1.9)" ng-model="ctrl.query" ng-change="ctrl.delayedSearch()">
                    </div>
                </div>
                <br/>
                <div class="form-inline">
                    <button type="submit" ng-click="ctrl.doSearch()" class="btn btn-success">
                        <span class="glyphicon glyphicon-search"></span>&nbsp; Search
                    </button>
                    <input class="form-control" type="number" min="0" placeholder="Result Limit" ng-model="ctrl.limit" style="max-width:100px">
                    <img class="loading-icon" src="/img/ajax-loader.gif" style="display:none;">
                    &nbsp; <strong>{{ctrl.resultSize}}</strong> Search Results

                    <button class="btn btn-primary pull-right" onclick="window.location = '/search'">
                        Search Resources &amp; Authors &nbsp; <span class="glyphicon glyphicon-chevron-right"></span>
                    </button>
                </div>
            </div>
        </form>

        <div class="well">
            <div id="result-container">

            </div>
            <hr/>
            <div id="raw-result-container">
                <!-- Content -->
            </div>
        </div>
    </div>
{/literal}
{/block}

{block name="scripts"}
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script>
        var method = "{$method}";
        var query = "{$query}";
        var limit = parseInt("{$limit}");
    </script>
    <script src="/js/search-version.min.js?1"></script>
{/block}
