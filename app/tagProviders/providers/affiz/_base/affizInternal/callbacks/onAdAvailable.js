playtemEmbedded.AffizInternal.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "onAdAvailable",
        onAlways: self.settings.onAdAvailable
    });
};