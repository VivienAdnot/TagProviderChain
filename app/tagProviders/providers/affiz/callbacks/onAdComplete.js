playtemEmbedded.Affiz.prototype.onAdComplete = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};