playtemEmbedded.RevContent.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.revContentContext;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
    .done(self.settings.onAdAvailable)
    .fail(self.settings.onError);
};