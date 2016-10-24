playtemEmbedded.SpotxInternal.prototype.onAdError = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError", function() {
        self.settings.onAdError();
    });
};