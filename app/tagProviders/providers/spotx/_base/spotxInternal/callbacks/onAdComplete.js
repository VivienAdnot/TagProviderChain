playtemEmbedded.SpotxInternal.prototype.onAdComplete = function() {
    var self = this;

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdComplete")
    .done(self.settings.onAdComplete)
    .fail(self.settings.onError);    
};