playtemEmbedded.SpotxInternal.prototype.onError = function(errorType) {
    var self = this;
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: errorType,
        onAlways: self.settings.onError
    });
};