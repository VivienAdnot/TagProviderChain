playtemEmbedded.SpotxInternal.prototype.onVideoComplete = function() {
    var self = this;
    
    playtemEmbedded.Core.track("spotx", self.settings.apiKey, "onVideoComplete", function() {
        self.settings.onAdComplete();
    });
};