playtemEmbedded.PlaytemVastPlayer.prototype.onAdUnavailable = function() {
    var self = this;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
    .done(self.settings.onAdUnavailable)
    .fail(self.settings.onError);
};