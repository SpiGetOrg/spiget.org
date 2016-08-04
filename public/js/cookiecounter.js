$(document).ready(function () {
    if (Cookies !== undefined) {
        var count = Cookies.get("pgvistcnt");
        if (count == undefined)
            count = 0;
        count++;
        Cookies.set("pgvistcnt", count);
    }
});
