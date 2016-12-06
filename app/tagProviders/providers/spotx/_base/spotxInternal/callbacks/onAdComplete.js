playtemEmbedded.SpotxInternal.prototype.onAdComplete = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "onAdComplete",
        onAlways: self.settings.onAdComplete
    });
};