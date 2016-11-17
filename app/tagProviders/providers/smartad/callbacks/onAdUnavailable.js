playtemEmbedded.Smartad.prototype.onAdUnavailable = function() {
    var self = playtemEmbedded.Core.globals.smartadContext;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
    .done(self.settings.onAdUnavailable)
    .fail(self.settings.onError);     
};