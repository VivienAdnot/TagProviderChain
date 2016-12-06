playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        (videoStatus === true) ? self.onAdComplete() : self.onAdUnavailable();
    };

    var startWatch = function() {
        self.watchVideoPlayerCreation(function(adStartedStatus) {
            (adStartedStatus) ? self.onAdAvailable() : self.onAdUnavailable();
        });
    };    

    var initialize = function() {
        self.init(function(error, result) {
            if(error) {
                self.onAdUnavailable();
                return;
            }

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  playtemEmbedded.AppSettings.apiKey,
                eventType: "requestSuccess",
                onAlways: startWatch
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "request",
        onAlways: initialize
    });
};