playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var videoCompleteDeferred = $.Deferred();

    var executeModulePromises = self.executeModule();

    executeModulePromises.isAdAvailable
    .done(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
        //continue event if it fails
        .then(isAdAvailableDeferred.resolve);
    })
    .fail(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
        //continue event if it fails
        .then(isAdAvailableDeferred.reject);
    });

    moduleExecutionPromises.videoComplete
    .done(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
        .then(videoCompleteDeferred.resolve);
    })
    .fail(function(errorType) {
        switch(errorType) {
            "videoError":
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
                .then($.noop);
            default:
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onInternalError")
                .then($.noop);
        }

        videoCompleteDeferred.reject();
    });

    moduleExecutionPromises.videoClose
    .then(function() {

    });

    return moduleExecutionPromises;
};