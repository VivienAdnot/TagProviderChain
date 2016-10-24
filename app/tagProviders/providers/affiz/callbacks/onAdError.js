playtemEmbedded.Affiz.prototype.onAdError = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError", function() {
        self.settings.onAdError();
    });
};