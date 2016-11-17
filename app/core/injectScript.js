playtemEmbedded.Core.injectScript = function(url, callback) {
    var deferred = $.Deferred();

    if(!url) {
        deferred.reject();
        return deferred.promise();
    }

    $.getScript(url, function(error, data) {
        if(error) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
    });

    window.setTimeout(deferred.reject, 2000);

    return deferred.promise();
};