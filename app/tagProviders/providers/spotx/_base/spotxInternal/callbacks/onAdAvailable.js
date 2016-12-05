playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;

    self.adFound = true;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onAlways: self.settings.onAdAvailable
    });
};