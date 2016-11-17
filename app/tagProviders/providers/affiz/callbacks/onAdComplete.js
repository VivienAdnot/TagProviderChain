playtemEmbedded.Affiz.prototype.onAdComplete = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdComplete")
    .done(self.settings.onAdComplete)
    .fail(self.settings.onError);
};