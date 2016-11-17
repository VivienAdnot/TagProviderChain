playtemEmbedded.SpotxInternal.prototype.watchVideoPlayerCreation = function() {
    var self = this;

    var deferred = $.Deferred();

    self.poll = window.setInterval(function() {
        // refresh every round
        var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            window.clearTimeout(self.timeouts.videoAvailability.instance);
            window.clearInterval(self.poll);

            deferred.resolve();
        }
    }, 250);

    self.timeouts.videoAvailability.instance = window.setTimeout(function () {
        window.clearInterval(self.poll);
        deferred.reject();
    }, self.timeouts.videoAvailability.duration);

    return deferred.promise();
};