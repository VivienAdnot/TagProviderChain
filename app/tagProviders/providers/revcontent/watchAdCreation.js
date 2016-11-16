playtemEmbedded.RevContent.prototype.watchAdCreation = function(callback) {
    var self = this;
    var timeoutTimer = null;

    var poll = window.setInterval(function() {
        // refresh every round
        var $videoPlayerContainer = $("#revcontent");
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            window.clearTimeout(timeoutTimer);

            window.clearInterval(poll);

            callback(true);
        }
    }, 250);

    timeoutTimer = window.setTimeout(function () {
        window.clearInterval(poll);

        callback(false);
    }, 30000);
};