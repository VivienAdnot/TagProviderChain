playtemEmbedded.Smartad.prototype.onAdUnavailable = function() {
    var self = this;

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
    .done(self.settings.onAdUnavailable)
    .fail(self.settings.onError);     
};