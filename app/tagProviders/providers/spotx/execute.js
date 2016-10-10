playtemEmbedded.Spotx.prototype.execute = function(callback) {
    var self = this;

    playtemEmbedded.Core.track("spotx", self.settings.apiKey, "request");

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

        self.watchVideoPlayerCreation(function(adStartedStatus) {
            if(adStartedStatus) {
                self.onAdAvailable();
                return;
            }
            
            self.onAdUnavailable();
        });
    });
};