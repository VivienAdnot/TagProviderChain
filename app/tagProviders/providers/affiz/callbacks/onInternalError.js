playtemEmbedded.Affiz.prototype.onInternalError = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onInternalError", function() {
        self.settings.onAdUnavailable();
    });
};