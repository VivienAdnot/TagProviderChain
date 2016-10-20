playtemEmbedded.PlaytemVastPlayer.prototype.onInternalError = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onInternalError", function() {
        self.settings.onAdUnavailable();
    });
};