playtemEmbedded.Affiz.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
    .done(self.settings.onAdAvailable)
    .fail(self.settings.onError);
};