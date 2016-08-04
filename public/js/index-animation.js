$(document).ready(function () {
    $image = $("img.full-logo");
    $pipe = $("span.logo-pipe");

    //Init
    $image.css("right", "-" + $image.width() + "px");

    //Vars
    var maxDistance = (($("div.content-container").width() + $(window).width()) / 2) / 6;

    var imageDistance = -$image.width();
    var pipeDistance = -$image.width() + 2;

    var resizing = false;

    function reset() {
        // maxDistance = $(window).width() / 6;
        // console.log("max: " + maxDistance);

        imageDistance = -$image.width();
        pipeDistance = -$image.width() + 2;
    }

    function updateDistance() {
        $image.css("right", imageDistance + "px");
        $pipe.css("width", pipeDistance);
    }

    function animateOut() {

        function moveOut() {
            if (imageDistance >= maxDistance) {
                resizing = false;
                return;
            }
            resizing = true;

            imageDistance += 2;
            pipeDistance += 2;

            updateDistance();

            setTimeout(function () {
                moveOut();
            }, 1);
        }

        if (!resizing) {
            moveOut();
        }

    }

    function animateIn(done) {

        function moveIn(done) {
            if (imageDistance < maxDistance) {
                if (typeof done !== "undefined") {
                    done();
                }
                resizing = false;
                return;
            }
            resizing = true;

            imageDistance -= 2;
            pipeDistance -= 2;

            updateDistance();

            setTimeout(function () {
                moveIn();
            }, 1);
        }

        if (!resizing) {
            moveIn(done);
        }
    }

    //Initial animation
    setTimeout(function () {
        animateOut();
    }, 1000);

    //Size fix on resize
    $(window).resize(function () {
        if (resizing)
            return;
        setTimeout(function () {
            maxDistance = (($("div.content-container").width() + $(window).width()) / 2) / 6;

            imageDistance = parseInt($image.css("right").replace("px", ""));
            pipeDistance = parseInt($pipe.css("width").replace("px", ""));

            // reset();

            animateIn(function () {
                animateOut();
            });
        }, 200);
    });
});

