playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        (videoStatus === true) ? self.onAdComplete() : self.onAdUnavailable();
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onFail: self.settings.onAdUnavailable,
        onDone: function() {

            self.init()
                .fail(self.settings.onAdUnavailable)
                .done(function() {

                    playtemEmbedded.Core.track({
                        providerName: self.settings.providerName,
                        apiKey:  self.settings.apiKey,
                        eventType: "requestSuccess",
                        onFail: self.settings.onAdUnavailable,
                        onDone: function() {

                            self.watchVideoPlayerCreation()
                                .done(function() {
                                    self.onAdAvailable();
                                })
                                .fail(function() {
                                    self.onAdUnavailable();
                                });
                        }
                    });
                });
        }
    });
};