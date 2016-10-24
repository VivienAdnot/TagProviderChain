playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        if(videoStatus === true) {
            self.onAdComplete();
        } else {
            self.onAdUnavailable();
        }
    };

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request");

    self.init(function(error, result) {
        if(error) {
            self.onScriptLoadingError();
            return;
        }
        
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess");

        self.watchVideoPlayerCreation(function(adStartedStatus) {
            if(adStartedStatus) {
                self.onAdAvailable();
                return;
            }
            
            self.onAdUnavailable();
        });
    });
};