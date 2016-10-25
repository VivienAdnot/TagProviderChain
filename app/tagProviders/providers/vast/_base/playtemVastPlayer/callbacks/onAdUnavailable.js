playtemEmbedded.PlaytemVastPlayer.prototype.onAdUnavailable = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable", function() {
        self.settings.onAdUnavailable();
    });
};