playtemEmbedded.Core.Ptrack = function(providerName, apiKey, eventType) {
    var deferred = $.Deferred();

    if(!providerName || !apiKey || !eventType) {
        deferred.reject();
        return deferred.promise();
    }

    var url = "//api.playtem.com/tracker.gif?a=" + eventType
        + "&c=&p=" + providerName
        + "&k=" + apiKey
        + "&t=" + playtemEmbedded.Core.Date.getCurrentTimestamp();

    $.get(url)
    .done(deferred.resolve)
    .fail(deferred.reject);

    return deferred.promise();
};