playtemEmbedded.SpotxInternal.prototype.watchVideoPlayerCreation = function(callback) {
    var self = this;

    self.poll = window.setInterval(function() {
        // refresh every round
        var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            window.clearTimeout(self.timeouts.videoAvailability.instance);

            window.clearInterval(self.poll);

            callback(true);
        }
    }, 250);

    self.timeouts.videoAvailability.instance = window.setTimeout(function () {
        window.clearInterval(self.poll);

        callback(false);
    }, self.timeouts.videoAvailability.duration);
};