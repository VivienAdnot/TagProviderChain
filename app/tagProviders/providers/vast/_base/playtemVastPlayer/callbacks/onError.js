playtemEmbedded.PlaytemVastPlayer.prototype.onError = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdError",
        onAlways: self.settings.onError
    });
};