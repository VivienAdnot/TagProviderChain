playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};