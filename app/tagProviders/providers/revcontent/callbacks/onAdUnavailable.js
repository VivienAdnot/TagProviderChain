playtemEmbedded.RevContent.prototype.onAdUnavailable = function() {
    var self = playtemEmbedded.Core.globals.revContentContext;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
    .done(self.settings.onAdUnavailable)
    .fail(self.settings.onError);
};