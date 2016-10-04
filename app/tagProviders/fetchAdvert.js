playtemEmbedded.TagProviders.prototype.fetchAdvert = function (onAdAvailable, onAdUnavailable, onAdComplete) {
    var self = this;
    var index = 0;

    var isArray = function(target) {
        return Object.prototype.toString.call(target) == "[object Array]";
    };

    var onAdUnavailablePerProvider = function() {
        moveNext();
    };

    var onError = function(errorMessage) {
        //todo log errorMessage ?
        moveNext();
    };

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider({
            debug: self.settings.debug,
            apiKey: self.settings.apiKey,
            hasReward: self.settings.hasReward,

            onAdAvailable: onAdAvailable,
            onAdUnavailable: onAdUnavailablePerProvider,
            onAdComplete: onAdComplete,
            onError: onError            
        });

        provider.execute();
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= self.settings.providers.length) {
            onAdUnavailable();
            return;
        }

        var currentProviderReference = self.settings.providers[index];
        executeProvider(currentProviderReference);
    };

    if(!isArray(self.settings.providers)) {
        playtemEmbedded.Core.log("TagProviders.fetchAdvert", "self.settings.providers must be an array");
        onAdUnavailable();
        return;
    }

    run();
};