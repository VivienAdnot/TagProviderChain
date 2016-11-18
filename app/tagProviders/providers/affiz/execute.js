playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    self.init()
        .fail(self.settings.onAdUnavailable)
        .done(function() {
            var watcherPromises = self.watcher();

            watcherPromises.isAdAvailable
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

            watcherPromises.onAdComplete
            .then(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
                .done(self.settings.onAdComplete)
                .fail(self.settings.onError);
            });

            watcherPromises.onAdClose
            .then(function() {
                var closeWindow = function() {
                    window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
                };

                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdClosed")
                .done(closeWindow)
                .fail(self.settings.onError);
            });
        });
};