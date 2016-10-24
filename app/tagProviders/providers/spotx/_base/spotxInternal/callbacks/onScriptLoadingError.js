playtemEmbedded.SpotxInternal.prototype.onScriptLoadingError = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onScriptLoadingError", function() {
        self.settings.onAdUnavailable();
    });
};