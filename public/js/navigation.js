var visible = true;

var ScrollHelper = {
    elements: {
        nav: $("nav#main_nav")
    }
};

$(document).ready(function () {
    ScrollHelper.onScroll = function (left, top) {
    };

    $(document).on("scroll", ScrollHelper.raw_scroll = function () {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        ScrollHelper.onScroll(left, top);

        if (top > 300) {
            if (visible) {
                ScrollHelper.elements.nav.fadeOut();

                visible = false;
            }
        } else {
            if (!visible) {
                ScrollHelper.elements.nav.fadeIn();

                visible = true;
            }
        }
    });

    ScrollHelper.raw_scroll();//Call the scroll to update the initial values
});
