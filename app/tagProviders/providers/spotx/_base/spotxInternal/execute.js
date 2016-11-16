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

    var initialize = function() {
        self.init(function(error, result) {
            if(error) {
                self.settings.onAdUnavailable();
                return;
            }

            var startWatch = function() {
                self.watchVideoPlayerCreation(function(adStartedStatus) {
                    if(adStartedStatus) {
                        self.onAdAvailable();
                        return;
                    }
                    
                    self.onAdUnavailable();
                });
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: startWatch,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};