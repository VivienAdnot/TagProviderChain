playtemEmbedded.Affiz.prototype.onScriptLoadingError = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onScriptLoadingError", function() {
        self.settings.onAdUnavailable();
    });
};