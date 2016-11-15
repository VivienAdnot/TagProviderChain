playtemEmbedded.Affiz.prototype.onAdError = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdError",
        onAlways: self.settings.onError
    });    
};