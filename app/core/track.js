playtemEmbedded.Core.track = function(providerName, apiKey, eventType, callback) {
    if(!callback || typeof callback != "function") {
        callback = $.noop;
    }

    var timestamp = playtemEmbedded.Core.Date.getCurrentTimestamp();
    var url = "//api.playtem.com/tracker.gif?a=" + eventType + "&c=&p=" + providerName + "&k=" + apiKey + "&t=" + timestamp;

    $.get(url)
        .fail(function(jqxhr) {
            if(typeof jqxhr == "object" && jqxhr.status && jqxhr.statusText) {
                playtemEmbedded.Core.log("playtemEmbedded", "pixel tracking fail. " + jqxhr.status + ": " + jqxhr.statusText);
            } else {
                playtemEmbedded.Core.log("playtemEmbedded", "pixel tracking fail. UNKNOWN");
            }
        })
        .always(function() {
            callback();
        });
};