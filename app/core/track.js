playtemEmbedded.Core.track = function(providerName, eventType, callback) {
    if(!callback || typeof callback != "function") {
        callback = $.noop;
    }

    var timestamp = playtemEmbedded.Core.Date.getCurrentTimestamp();
    var url = "//api.playtem.com/tracker.gif?a=" + eventType + "&c=&p=" + providerName + "&t=" + timestamp;

    $.get(url)
        .fail(function() {
            playtemEmbedded.Core.log("playtemEmbedded", "couldn't retrieve pixel tracking from: " + url);
        })
        .always(function() {
            callback();
        });
};