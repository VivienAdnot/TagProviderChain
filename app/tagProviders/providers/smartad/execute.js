playtemEmbedded.Smartad.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        self.watcher()
        .done(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });
    });
};