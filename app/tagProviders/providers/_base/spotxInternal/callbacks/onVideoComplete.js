playtemEmbedded.SpotxInternal.prototype.onVideoComplete = function() {
    var self = this;
    
    track(self.settings.providerName, self.settings.apiKey, "onVideoComplete", function() {
        self.settings.onAdComplete();
    });
};