playtemEmbedded.Affiz.prototype.onAdUnavailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    window.clearTimeout(self.timeoutTimer);
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};