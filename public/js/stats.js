$(document).ready(function () {
    setTimeout(function () {
        $.ajax({
            url: "https://api.spiget.org/v2/status?spiget___ua=SpigetStats&pretty=false&callback=?",
            dataType: "jsonp",
            success: function (r) {
                resources = r.stats.resources;
                authors = r.stats.authors;

                animateValue("#stat_resources", resources, 1500);
                setTimeout(function () {
                    animateValue("#stat_authors", authors, 1500);
                }, 250);
            }
        });
        // Make the loading delay less noticeable
        animateValue("#stat_daily_requests", 200000, 10000);
        $.ajax({
            url: "https://api.spiget.org/v2/metrics/requests/30?spiget___ua=SpigetStats&pretty=false&simple=true",
            dataType: "json",
            success: function (r) {
                total = 0;
                count = 0;

                $.each(r, function (key, value) {
                    if (value.total > 0) {
                        total += value.total;

                        count += 1;
                    }
                });

                avg = (total > 0 && count > 0) ? total / count : 0;
                rounded = Math.round(avg);

                $("#stat_daily_requests").stop();
                animateValue("#stat_daily_requests", rounded, 1500);
            }
        });
        $.ajax({
            url: "https://api.spiget.org/v2/resources/recentUpdates?spiget___ua=SpigetStats&size=16&pretty=false&callback=?",
            dataType: "jsonp",
            success: function (r) {
                var counter = 0;
                $.each(r, function (index, resource) {
                    if (isArray(resource))
                        return;
                    counter += 1;
                    $("#new-resources").append(//
                        "<li>" + //
                        "	<a target='_blank' href='https://r.spiget.org/" + resource.id + "'>" + resource.name + "<span class='new-res-extra text-muted' id='new_res_extra_" + resource.id + "'></span></a>" + //
                        "	<a class='new-res-author text-muted pull-right' id='new_res_author_" + resource.id + "' target='_blank' href='#'></a>" + //
                        "</li>");

                    if (resource.updateDate === resource.releaseDate) {
                        $("#new_res_extra_" + resource.id).attr("title", "New Resource");
                        $("#new_res_extra_" + resource.id).append("&nbsp;<span class='glyphicon glyphicon-star'></span>");
                    }
                });

                /*
                $(".new-res-author").each(function () {
                    $this = $(this);
                    var id = $this.attr("id");
                    var resId = id.replace("new_res_author_", "");
                    var url = "https://api.spiget.org/v2/resources/" + resId + "/author?callback=?";
                    $.ajax({
                        url: url,
                        dataType: "jsonp",
                        success: function (a) {
                            elem = $("#" + id);
                            elem.attr("href", "https://api.spiget.org/v2/authors/" + a.id + "/go");
                            elem.text(a.username);
                        }
                    });
                });
                */

                if (counter === 0) {
                    $("#new-resources").append(//
                        "<li>" + //
                        "	<span class='text-muted'>No new resources since the last update</span>" + //
                        "</li>");
                }
            }
        });
        $.ajax({
            url: "https://api.spiget.org/v2/authors/recentUpdates?spiget___ua=SpigetStats&size=16&pretty=false&callback=?",
            dataType: "jsonp",
            success: function (r) {
                var counter = 0;
                $.each(r, function (index, author) {
                    if (isArray(author))
                        return;
                    counter += 1;
                    $("#new-authors").append(//
                        "<li>" + //
                        "	<a target='_blank' href='https://a.spiget.org/" + author.id + "'>" + author.name + "</a>" + //
                        "</li>");
                });
                if (counter === 0) {
                    $("#new-authors").append(//
                        "<li>" + //
                        "	<span class='text-muted'>No new authors since the last update</span>" + //
                        "</li>");
                }
            }
        });
    }, 500);

    var scrollIndex = 1;
    setInterval(function () {
        if ($("#hidden_test").is(":visible") > 0) {
            $(".scroll-stat").each(function () {
                $this = $(this);
                if (!$this.is(":visible")) {
                    $this.fadeIn();
                }
            });
            return;
        }
        if (scrollIndex >= $(".scroll-stat").length) {
            scrollIndex = 0;
        }
        console.info(scrollIndex);
        $current = $(".scroll-stat").eq(scrollIndex++);

        console.log($current);

        $(".scroll-stat").each(function () {
            $this = $(this);
            if ($this.is(":visible")) {
                $this.fadeOut(500);
            }
        });
        $current.fadeIn(500);

    }, 3500);
});

//http://codepen.io/shivasurya/pen/FatiB/
function animateValue($element, value, duration) {
    $element = $($element);
    if ($element.prop("counter") === undefined) {
        $element.prop("counter", 0);
    }
    $element.animate({
        counter: value
    }, {
        duration: duration,
        easing: "swing",
        step: function (now) {
            $element.text(numeral(Math.ceil(now)).format("0,0"));
        }
    });
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
