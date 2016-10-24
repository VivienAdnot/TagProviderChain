playtemEmbedded.PlaytemVastPlayer.prototype.onScriptLoadingError = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onScriptLoadingError", function() {
        self.settings.onAdUnavailable();
    });
};