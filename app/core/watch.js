playtemEmbedded.Core.watch = function(condition, interval, timeout) {
    var deferred = $.Deferred();

    if(typeof condition !== "function") {
        deferred.reject();
        return deferred.promise();
    }

    interval = interval || 250;
    timeout = timeout || 3000;

    var poll = window.setInterval(function() {
        if(condition()) {
            deferred.resolve();
            window.clearInterval(poll);
        }
    }, timeout);

    window.setTimeout(function () {
        deferred.reject();
        window.clearInterval(poll);
    }, timeout);

    return deferred.promise();
};