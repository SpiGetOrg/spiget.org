$(function () {
    $(".eo").click(function () {
        $this = $(this);
        text = $this.text();
        if ("e" == text)
            $(".eo").text("o");
        if ("o" == text)
            $(".eo").text("e");
    });
});
