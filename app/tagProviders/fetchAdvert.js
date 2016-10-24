playtemEmbedded.TagProviders.prototype.fetchAdvert = function (placementProfile) {
    var self = this;
    var index = 0;

    var isArray = function(target) {
        return Object.prototype.toString.call(target) == "[object Array]";
    };

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider({
            debug: self.settings.debug,
            apiKey: self.settings.apiKey,

            onAdAvailable: placementProfile.onAdAvailable,
            onAdComplete: placementProfile.onAdComplete,
            onAdError: placementProfile.onAdError,

            onAdUnavailable: function() {
                moveNext();
            }
        });

        provider.execute();
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= self.settings.providers.length) {
            placementProfile.onAllAdUnavailable();
            return;
        }

        var currentProviderReference = self.settings.providers[index];
        executeProvider(currentProviderReference);
    };

    if(!isArray(self.settings.providers || self.settings.providers.length == 0)) {
        playtemEmbedded.Core.log("TagProviders.fetchAdvert", "self.settings.providers is empty or not an array");
        placementProfile.onAllAdUnavailable();
        return;
    }

    run();
};