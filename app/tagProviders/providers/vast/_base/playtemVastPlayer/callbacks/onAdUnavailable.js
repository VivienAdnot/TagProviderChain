playtemEmbedded.PlaytemVastPlayer.prototype.onAdUnavailable = function() {
    var self = this;
    
    if(self.adFound === true) {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError", function() {
            self.settings.onAdError();
        });
    }
    
    else {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable", function() {
            self.settings.onAdUnavailable();
        });
    }
};