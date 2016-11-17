playtemEmbedded.RevContent.prototype.watchAdCreation = function(callback) {
    var self = this;
    var timeoutTimer = null;

    var deferred = $.Deferred();

    var poll = window.setInterval(function() {
        var $videoPlayerContainer = $("#revcontent");
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            deferred.resolve();

            window.clearTimeout(timeoutTimer);
            window.clearInterval(poll);            
        }
    }, 250);

    timeoutTimer = window.setTimeout(function () {
        deferred.reject();
        window.clearInterval(poll);
    }, 5000);

    return deferred.promise();
};