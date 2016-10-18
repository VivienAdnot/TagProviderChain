playtemEmbedded.SpotxInternal.prototype.onAdUnavailable = function() {
    var self = this;
    
    track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable", function() {
        self.settings.onAdUnavailable();
    });
};