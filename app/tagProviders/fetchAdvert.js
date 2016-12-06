playtemEmbedded.TagProviders.prototype.fetchAdvert = function () {
    var self = this;
    var index = 0;

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider({
            onAdAvailable: self.settings.appCallbacks.onAdAvailable,
            onAdComplete: self.settings.appCallbacks.onComplete,
            onError: self.settings.appCallbacks.onComplete,
            onAdUnavailable: moveNext
        });

        provider.execute();
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= playtemEmbedded.AppSettings.providers.length) {
            self.settings.appCallbacks.onAllAdUnavailable();
            return;
        }

        var currentProviderReference = playtemEmbedded.AppSettings.providers[index];
        executeProvider(currentProviderReference);
    };

    run();
};