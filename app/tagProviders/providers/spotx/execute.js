playtemEmbedded.Spotx.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        if(videoStatus === true) {
            self.onVideoComplete();
        } else {
            self.onAdUnavailable();
        }
    };

    self.init(function(error, result) {
        if(error) {
            self.settings.onError(error);
            return;
        }

        playtemEmbedded.Core.track("spotx", self.settings.apiKey, "request");

        self.watchVideoPlayerCreation(function(adStartedStatus) {
            if(adStartedStatus) {
                self.onAdAvailable();
                return;
            }
            
            self.onAdUnavailable();
        });
    });
};