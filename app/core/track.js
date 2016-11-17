playtemEmbedded.Core.track = function(options) {

    var defaults = {
        providerName: undefined,
        apiKey: undefined,
        eventType: undefined
    };

    var settings = $.extend({}, defaults, options);

    if(!settings.providerName || !settings.apiKey || !settings.eventType) {
        settings.onFail();
        settings.onAlways();
        return;
    }

    var url = "//api.playtem.com/tracker.gif?a=" + settings.eventType
        + "&c=&p=" + settings.providerName
        + "&k=" + settings.apiKey
        + "&t=" + playtemEmbedded.Core.Date.getCurrentTimestamp();

    return $.get(url);
};