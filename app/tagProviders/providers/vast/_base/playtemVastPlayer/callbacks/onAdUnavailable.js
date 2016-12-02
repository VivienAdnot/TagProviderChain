playtemEmbedded.PlaytemVastPlayer.prototype.onAdUnavailable = function() {
    var self = this;

    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};