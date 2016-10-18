playtemEmbedded.SpotxInternal.prototype.onVideoComplete = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onVideoComplete", function() {
        self.settings.onAdComplete();
    });
};