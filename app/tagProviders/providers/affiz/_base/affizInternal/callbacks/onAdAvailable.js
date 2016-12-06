playtemEmbedded.AffizInternal.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};