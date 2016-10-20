playtemEmbedded.Affiz.prototype.onAdComplete = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete", function() {
        self.settings.onAdComplete();
    });
};