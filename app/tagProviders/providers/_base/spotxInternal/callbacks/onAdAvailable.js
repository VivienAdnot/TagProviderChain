playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;
    
    track(self.settings.providerName, self.settings.apiKey, "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};