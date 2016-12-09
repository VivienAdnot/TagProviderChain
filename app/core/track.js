playtemEmbedded.Core.track = function(options) {
    var defaults = {
        providerName: undefined,
        apiKey: undefined,
        eventType: undefined,
        onDone: $.noop,
        onFail: $.noop,
        onAlways: $.noop
    };

    var settings = $.extend({}, defaults, options);

    if(!settings.providerName || !settings.apiKey || !settings.eventType) {
        playtemEmbedded.Core.log("playtemEmbedded", "playtemEmbedded.Core.track missing option");
        settings.onFail();
        settings.onAlways();
        return;
    }

    var trackerUriBase = (playtemEmbedded.Core.globals.debug === true) ? "//poc.playtem.com/tracker.gif" : "//api.playtem.com/tracker.gif";

    var url = trackerUriBase + "?a=" + settings.eventType
        + "&c=&p=" + settings.providerName
        + "&k=" + settings.apiKey
        + "&t=" + playtemEmbedded.Core.Date.getCurrentTimestamp();

    $.get(url)
        .done(function() {
            settings.onDone();
        })
        .fail(function() {
            playtemEmbedded.Core.log("playtemEmbedded", "pixel tracking fail.");
            settings.onFail();
        })
        .always(function() {
            settings.onAlways();
        });
};