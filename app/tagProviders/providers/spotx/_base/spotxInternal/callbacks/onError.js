playtemEmbedded.SpotxInternal.prototype.onError = function(errorType) {
    var self = this;
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: errorType,
        onAlways: self.settings.onError
    });
};