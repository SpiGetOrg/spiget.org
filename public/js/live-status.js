window.Status = {
    cache: {
        agents: [],
        methods: []
    },
    update: function () {
        $.ajax({
            url: "https://api.spiget.org/v2/metrics/requests/1?callback=?",
            dataType: "jsonp",
            success: function (req) {
                var firstRun = Status.cache.agents.length == 0 && Status.cache.methods.length == 0;

                var oldAgents = Status.cache.agents;
                var oldMethods = Status.cache.methods;

                for (var key in req) {
                    Status.cache.agents = req[key].user_agents;
                    Status.cache.methods = req[key].methods;
                    break;
                }

                //Ignore all of our requests
                delete Status.cache.agents.SpigetLiveStatus;
                // Status.cache.methods["\/v1\/metrics\/requests"]=Status.cache.methods["\/v1\/metrics\/requests"]-1;
                delete Status.cache.methods["\/v2\/metrics\/requests"];

                //Wait for the next run
                if (firstRun || Status.cache.agents.length == 0 && Status.cache.methods.length == 0)
                    return;

                var newAgents = Status.cache.agents;
                var newMethods = Status.cache.methods;

                var agentDiff = difference(oldAgents, newAgents);
                var methodDiff = difference(oldMethods, newMethods);

                var agent;
                var method;
                for (var key in agentDiff) {
                    agent = key;
                    break;
                }
                for (var key in methodDiff) {
                    method = key;
                    break;
                }

                if (agent != undefined && method != undefined) {
                    var amountDiff = newMethods[method] - oldMethods[method];
                    if (amountDiff <= 0)
                        return;

                    $(".user-agent").removeClass("bold");
                    $(".method").removeClass("bold");

                    if (amountDiff > 1)
                        agent += " x" + amountDiff;

                    var $agent = $("#" + Status.spawnAgent(agent));
                    var $method = $("#" + Status.spawnMethod(method));

                    $agent.addClass("bold");
                    $method.addClass("bold");

                    for (var i = 0; i < amountDiff; i++) {
                        setTimeout(function () {
                            var $orb = $("#" + Status.spawnOrb($agent));

                            $orb.css({
                                top: "0px"
                            });
                            $orb.animate({
                                left: $method.offset().left - $(".content-container").first().offset().left,
                                opacity: 1
                            }, "slow", function () {
                                $orb.fadeOut(function () {
                                    $orb.remove();
                                });
                            });
                        }, 200 * i);
                    }

                    setTimeout(function () {
                        $agent.fadeOut(function () {
                            $agent.remove();
                        });
                        $method.fadeOut(function () {
                            $method.remove();
                        });
                    }, 15000 + (210 * amountDiff));
                }
            }
        });
    },
    spawnAgent: function (userAgent) {
        $uaId = "ua-" + moment();
        $("#leftCol").prepend("<div class='user-agent' id='" + $uaId + "' style='display:none'></div>");

        $("#" + $uaId).text(userAgent);
        $("#" + $uaId).fadeIn();
        return $uaId;
    },
    spawnMethod: function (method) {
        $mId = "m-" + moment();
        $("#rightCol").prepend("<div class='method' id='" + $mId + "' style='display:none'></div>");

        $("#" + $mId).text(method);
        $("#" + $mId).fadeIn();
        return $mId;
    },
    spawnOrb: function (parent) {
        $orbId = "orb-" + moment();
        parent.prepend("<div class='orb' id='" + $orbId + "' style='opacity:0.2'></div>");

        return $orbId;
    }
};

$(document).ready(function () {
    Status.timer = setInterval(function () {
        Status.update();
    }, 1000);
});

//http://stackoverflow.com/questions/2558800/doing-a-diff-on-an-associative-array-in-javascript-jquery
function difference(obj1, obj2) {
    var result = {};
    $.each(obj1, function (key, value) {
        if (!obj2.hasOwnProperty(key) || obj2[key] !== obj1[key]) {
            result[key] = value;
        }
    });

    return result;
}