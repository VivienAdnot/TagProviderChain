playtemEmbedded.Core.track = function(providerName, apiKey, eventType, callback) {
    if(!callback || typeof callback != "function") {
        callback = $.noop;
    }

    var timestamp = playtemEmbedded.Core.Date.getCurrentTimestamp();
    var url = "//api.playtem.com/tracker.gif?a=" + eventType + "&c=&p=" + providerName + "&k=" + apiKey + "&t=" + timestamp;

    $.get(url)
        .fail(function(jqxhr) {
            var message = "pixel tracking fail.";
            var thisArgs = arguments;

            for(var key in thisArgs) {
                if(!thisArgs.hasOwnProperty(key)) {
                    continue;
                }

                message += " " + thisArgs[key].toString();
            }

            playtemEmbedded.Core.log("playtemEmbedded", message);
        })
        .always(function() {
            callback();
        });
};