{extends "layout.tpl"}

{block name="ngApp"}ng-app="searchApp"{/block}

{block name="title"}
    <title>Search | Spiget</title>
{/block}

{block name="style"}
    <link rel="stylesheet" href="/css/search.min.css">
{/block}

{block name="content"}
{literal}
    <h1 class="page-header">Search</h1>
    <div ng-controller="SearchController as ctrl">
        <form>
            <div class="well">
                <div class="content row">
                    <div class="col-md-3">
                        <select class="form-control" ng-model="ctrl.type" ng-change="ctrl.doSearch()">
                            <option value="authors">Author</option>
                            <option value="resources">Resource</option>
                        </select>
                    </div>
                    <div class="col-md-9">
                        <input class="form-control" type="text" placeholder="Search for {{ctrl.type === 'authors' ? 'Author' : 'Resource'}}" ng-model="ctrl.query" ng-change="ctrl.delayedSearch()">
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

                    <button class="btn btn-primary pull-right" onclick="window.location = '/search/version'">
                        Search Versions &nbsp; <span class="glyphicon glyphicon-chevron-right"></span>
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
        var type = "{$type}";
        var query = "{$query}";
        var limit = parseInt("{$limit}");
    </script>
    <script src="/js/search.min.js?1"></script>
{/block}
