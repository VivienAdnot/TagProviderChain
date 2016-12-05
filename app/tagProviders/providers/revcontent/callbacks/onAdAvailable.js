playtemEmbedded.RevContent.prototype.onAdAvailable = function() {
    var self = this;
    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onAlways: self.settings.onAdAvailable
    });
};