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
            onAdComplete: placementProfile.onComplete,
            onError: placementProfile.onComplete,
            onAdUnavailable: moveNext
        });

        provider.execute();
    };

    // var onError = function(errorType) {
    //     switch(errorType) {
    //         case "timeout":
    //             placementProfile.onComplete();
    //             break;
    //         case "videoError":
    //             placementProfile.onComplete();
    //             break;
    //         case "internalError":
    //             moveNext();
    //             break;                
    //         default:
    //             placementProfile.onComplete();
    //     }
    // };

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