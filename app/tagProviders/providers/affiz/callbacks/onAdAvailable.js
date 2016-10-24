playtemEmbedded.Affiz.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    self.adFound = true;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};