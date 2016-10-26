playtemEmbedded.PlaytemVastPlayer.prototype.onInternalError = playtemEmbedded.Core.Operations.onceProxy(function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onInternalError");
});