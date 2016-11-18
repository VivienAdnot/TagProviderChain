playtemEmbedded.Reward.prototype.requestUserId = function() {
    var self = this;
    var deferred = $.Deferred();

    var extractUserId = function(postMessage) {
        var playtemIdentifier = "playtem:js:";

        //drop this message and wait for the next one
        if(!postMessage || !postMessage.data) {
            return;
        }

        var userIdMessage = postMessage.data;

        //drop this message and wait for the next one
        if(userIdMessage.indexOf(playtemIdentifier) != 0) {
            return;
        }

        var extractUserId = function() {
            return userIdMessage.substring(playtemIdentifier.length);
        };

        deferred.resolve(extractUserId());
    };

    // listen
    window.addEventListener("message", extractUserId, false);

    // send
    window.parent.postMessage(self.settings.sendEvents.userId, "*");

    window.setTimeout(deferred.reject, 2000);

    return deferred.promise();
};