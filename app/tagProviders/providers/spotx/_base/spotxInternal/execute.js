playtemEmbedded.SpotxInternal.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        var watcherPromises = self.watcher();

        watcherPromises.isAdAvailable
        .done(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdComplete
        .then(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
            .done(self.settings.onAdComplete)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdError
        .then(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
            .then(self.settings.onError);
        });
    });
};