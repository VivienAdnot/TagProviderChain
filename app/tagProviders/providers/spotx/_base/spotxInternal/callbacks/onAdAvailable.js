playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;

    self.adFound = true;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "onAdAvailable",
        onAlways: self.settings.onAdAvailable
    });
};