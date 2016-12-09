playtemEmbedded.PlaytemVastPlayer.prototype.onAdComplete = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};