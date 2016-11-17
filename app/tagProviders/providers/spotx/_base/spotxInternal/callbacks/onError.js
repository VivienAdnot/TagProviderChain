playtemEmbedded.SpotxInternal.prototype.onError = function() {
    var self = playtemEmbedded.Core.globals.spotxInternalContext;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
    .then(self.settings.onError);    
};