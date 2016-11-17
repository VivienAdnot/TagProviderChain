playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.spotxInternalContext;

    self.adFound = true;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
    .done(self.settings.onAdAvailable)
    .fail(self.settings.onError);    
};