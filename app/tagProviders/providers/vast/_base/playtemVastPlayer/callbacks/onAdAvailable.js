playtemEmbedded.PlaytemVastPlayer.prototype.onAdAvailable = function() {
    var self = this;

    window.clearTimeout(self.timeoutTimer);
    self.adFound = true;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};