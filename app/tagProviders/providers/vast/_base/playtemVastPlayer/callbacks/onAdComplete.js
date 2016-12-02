playtemEmbedded.PlaytemVastPlayer.prototype.onAdComplete = function() {
    var self = this;

    window.clearTimeout(self.timeoutTimer);
    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};