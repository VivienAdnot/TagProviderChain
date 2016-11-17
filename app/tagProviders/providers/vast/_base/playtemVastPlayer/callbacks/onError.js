playtemEmbedded.PlaytemVastPlayer.prototype.onError = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
    .then(self.settings.onError);
};