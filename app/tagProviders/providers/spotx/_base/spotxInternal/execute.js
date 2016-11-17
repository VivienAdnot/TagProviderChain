playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        (videoStatus === true) ? self.onAdComplete() : self.onAdUnavailable();
    };

    self.init()
        .fail(self.settings.onAdUnavailable)
        .done(function() {
            self.watchVideoPlayerCreation()
                .done(function() {
                    self.onAdAvailable();
                })
                .fail(function() {
                    self.onAdUnavailable();
                });
        });
};