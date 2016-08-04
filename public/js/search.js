angular.module("searchApp", []).controller("SearchController", function ($scope) {
    var ctrl = this;

    ctrl.type = type;
    ctrl.query = query;

    ctrl.limit = limit != undefined && limit > 0 ? limit : 10;
    ctrl.resultSize = 0;

    ctrl.doSearch = function () {
        if (ctrl.query.length > 1) {
            if (ctrl.limit == undefined || ctrl.limit < 0)
                ctrl.limit = 10;

            $(".loading-icon").fadeIn();

            $("#raw-result-container").empty();
            $("#result-container").empty();

            window.history.pushState("", "", "/search/" + ctrl.type + ":" + ctrl.query + "/" + ctrl.limit);

            ctrl.resultSize = 0;
            $.ajax({
                url: "https://api.spiget.org/v2/search/" + ctrl.type + "/" + ctrl.query + "?spiget__ua=SpigetSearch&size=" + ctrl.limit + "&callback=?",
                dataType: "jsonp",
                success: function (r) {
                    $(".loading-icon").fadeOut();
                    Alert.alert("success", "", false);

                    ctrl.resultSize = r.length;
                    ctrl.apply();

                    //Raw result
                    $("#raw-result-container").html(//
                        "<pre>" + //
                        JSON.stringify(r, null, 4) + //
                        "</pre>"//
                    );

                    //Parsed result
                    $container = $("#result-container");
                    $container.empty();
                    $.each(r, function (index, entry) {
                        $container.append(//
                            "<div class='panel panel-info resource-panel'>" + //
                            "	<div class='panel-heading'>" + //
                            "		<a href='https://api.spiget.org/v2/" + ctrl.type + "/" + entry.id + "/go' target='_blank'>" + (ctrl.type == "resources" ? entry.name : entry.name ) + "</a><span class='pull-right text-muted'>#" + entry.id + "</span>" + //
                            "	</div>" + //
                            (ctrl.type == "resources" ? //
                            "	<div class='panel-body'>" + //
                            "		<span>" + entry.tag + "</span>" + //
                            "	</div>" : "") + //
                            "</div>" + //
                            "<br/>"//
                        );
                    });
                },
                error: function (e) {
                    $(".loading-icon").fadeOut();
                    console.log(e);
                    if (e.status == 404) {
                        Alert.alert("warning", "Nothing found", true);
                    } else {
                        Alert.alert("danger", "Search failed", true);
                    }

                }
            });
        }
    };

    var delayedSearchTimer = -1;
    ctrl.delayedSearch = function () {
        if (delayedSearchTimer != -1) {
            clearTimeout(delayedSearchTimer);
        }
        delayedSearchTimer = setTimeout(function () {
            ctrl.doSearch();
            delayedSearchTimer = -1;
        }, 250);
    };

    ctrl.apply = function () {
        $scope.$apply();
    };

    (function () {
        setTimeout(function () {
            ctrl.doSearch();
        }, 500);
    })();
});
