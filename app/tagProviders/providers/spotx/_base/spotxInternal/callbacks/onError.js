playtemEmbedded.SpotxInternal.prototype.onError = function() {
    var self = this;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
    .then(self.settings.onError);    
};