playtemEmbedded.SmartadInternal.prototype.onError = function(errorType) {
    var self = this;
    errorType = errorType || playtemEmbedded.AppSettings.providerErrorTypes.internal;

    window.clearTimeout(self.timeoutTimer);
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: errorType,
        onAlways: self.settings.onError
    });
};