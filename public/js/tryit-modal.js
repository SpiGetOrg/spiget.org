$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.async = true;
});

var modalLoaded = false;
$('#tryit-modal').on('show.bs.modal', function (event) {
    if (!modalLoaded) {
        $.ajax({
            url: "https://spiget.org/tryit/?embed=true",
            success: function (html) {
                $("#tryit-body").html(html);
                modalLoaded = true;
            }
        });
    }
});
