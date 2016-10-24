playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;

    self.adFound = true;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};