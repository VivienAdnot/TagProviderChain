playtemEmbedded.SpotxInternal.prototype.onError = function() {
    var self = this;

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdError")
    .then(self.settings.onError);    
};