playtemEmbedded.Spotx.prototype.execute = function(callback) {
    var self = this;

    playtemEmbedded.Core.createTracker("spotx", "request");

    self.init(callback, function(error, result) {
        if(error) {
            callback(error, result);
            return;
        }

        self.detectOnAdStarted(function(adStartedStatus) {
            if(adStartedStatus) {
                self.onAdAvailable();
                return;
            }
            
            self.onAdUnavailable();
        });
    });

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        if(videoStatus === true) {
            self.settings.debug && console.log("spotXCallback: video completion");
            self.onVideoComplete();
        } else {
            self.settings.debug && console.log("spotXCallback: onAdUnavailable");
            onAdUnavailable();
        }
    };
};