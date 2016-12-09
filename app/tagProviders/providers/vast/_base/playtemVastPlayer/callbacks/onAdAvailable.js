playtemEmbedded.PlaytemVastPlayer.prototype.onAdAvailable = function(providerName) {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};