playtemEmbedded.PlaytemVastPlayer.prototype.onAdAvailable = function(providerName) {
    var self = this;
    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onAlways: self.settings.onAdAvailable
    });
};