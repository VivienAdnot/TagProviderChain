playtemEmbedded.Affiz.prototype.onScriptLoadingError = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onScriptLoadingError",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};