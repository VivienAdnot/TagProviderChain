playtemEmbedded.SpotxInternal.prototype.onAdComplete = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onAlways: self.settings.onAdComplete
    });
};