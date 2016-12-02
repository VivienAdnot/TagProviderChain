playtemEmbedded.PlaytemVastPlayer.prototype.onTimeout = function() {
    var self = this;

    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onTimeout",
        onDone: self.settings.onTimeout,
        onFail: self.settings.onError
    });
};