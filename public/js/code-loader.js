$(document).ready(function () {
    var tCount = 0;
    var lCount = 0;

    var codes = [];

    $(".external-code").each(function () {
        tCount += 1;
        codes.push($(this));
    });

    function load(n) {
        if (n >= tCount) {
            setTimeout(function () {
                $('pre code').each(function (i, block) {
                    hljs.highlightBlock(block);
                });
            }, 500);
            return;
        }

        var $this = codes[n];

        var src = $this.attr("code-src");
        console.info("Loading " + src + "...");
        $.ajax({
            url: src,
            success: function (c) {
                $this.text(c);

                load(n + 1);
            },
            error: function (c) {
                $this.text(c);

                load(n + 1);
            }
        });
    }

    load(0);

});
