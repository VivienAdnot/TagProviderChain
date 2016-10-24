playtemEmbedded.PlaytemVastPlayer.prototype.onAdComplete = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete", function() {
        self.settings.onAdComplete();
    });
};