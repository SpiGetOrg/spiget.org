window.RequestsPerMinute = {
    rpm: 60,
    lastTotal: -1,
    queries: 0,
    getTotal: function (callback) {
        $.ajax({
            url: "https://api.spiget.org/v2/metrics/requests/1?spiget__ua=SpigetRPM&callback=?",
            dataType: "jsonp",
            success: function (r) {
                RequestsPerMinute.queries++;
                $.each(r, function (k, v) {
                    callback(v.total);
                });
            }
        });
    },
    updateElements: function () {
        animateRPMValue($(".rpm-display"), RequestsPerMinute.rpm, 1500);
    },
    blinkElements: function () {
        var delay = (60 / Math.max(RequestsPerMinute.rpm, 1)) * 1000;
        if (delay > 30000) {
            delay = 10000;
        }

        $(".rpm-display.blink").addClass("active");
        setTimeout(function () {
            $(".rpm-display.blink").removeClass("active");
        }, delay / 2);

        setTimeout(function () {
            RequestsPerMinute.blinkElements();
        }, delay);
    },
    refresh: function () {
        RequestsPerMinute.getTotal(function (total) {
            if (RequestsPerMinute.lastTotal > 0) {
                var diff = (total - RequestsPerMinute.lastTotal) * 6.0;
                if (RequestsPerMinute.queries % 6 == 0) {
                    RequestsPerMinute.rpm = diff;
                } else {
                    RequestsPerMinute.rpm = (RequestsPerMinute.rpm + diff) / 2.0;
                }
                console.info("RPM: " + RequestsPerMinute.rpm);
            }
            RequestsPerMinute.lastTotal = total;

            RequestsPerMinute.updateElements();
        });
    }
};

RequestsPerMinute.refresh();
setInterval(function () {
    RequestsPerMinute.refresh();
}, 10000);
setTimeout(function () {
    RequestsPerMinute.blinkElements();
}, 10000);

//http://codepen.io/shivasurya/pen/FatiB/
function animateRPMValue($element, value, duration) {
    if ($element.prop("counter") === undefined) {
        $element.prop("counter", 0);
    }
    $element.animate({
        counter: value
    }, {
        duration: duration,
        easing: "swing",
        step: function (now) {
            $($element).text(Math.ceil(now));
        }
    });
}
