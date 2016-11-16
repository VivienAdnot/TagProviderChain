playtemEmbedded.RevContent.prototype.onAdComplete = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete", function() {
        self.settings.onAdComplete();
    });
};