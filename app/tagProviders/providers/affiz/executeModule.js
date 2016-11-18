playtemEmbedded.Affiz.prototype.executeModule = function() {
    var self = this;

    self.init()
    .fail(internalErrorDeferred.resolve)
    .done(function(watcherPromises) {
        var resultPromises = self.watcher(watcherPromises);

        resultPromises.videoClose
        .then(function() {
            var closeWindow = function() {
                window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
            };

            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdClosed")
            .then(closeWindow),
        });
    });

    return watcherPromises;
};