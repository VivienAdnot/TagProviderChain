playtemEmbedded.Affiz.prototype.onAdUnavailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
    .done(self.settings.onAdUnavailable)
    .fail(self.settings.onError);    
};