playtemEmbedded.TagProviders.prototype.executeRewarded = function () {
    var self = this;

    var deferreds = {
        isAdAvailable : $.Deferred(),
        videoComplete : $.Deferred()
    };

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers,
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType,
        debug: self.settings.debug,
        blockWindow: self.settings.placementType === playtemEmbedded.AppSettings.placementTypes.rewarded
    });
    
    var tagProviderPromises = tagProviders.fetchAdvert(deferreds);

    tagProviderPromises.isAdAvailable
    .fail(function() {
        window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
    })
    .done(function() {
        window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
        self.windowBlocker.setBlocker();
    });

    tagProviderPromises.videoComplete
    .then(function() {
        if(self.settings.hasReward == false) {
            self.windowBlocker.clearBlocker();
        }

        var rewarder = new playtemEmbedded.Reward({
            apiKey: self.settings.apiKey
        });

        rewarder.execute()
        .fail(function(error) {
            playtemEmbedded.Core.log("reward", error);
        })
        .always(function() {
            self.windowBlocker.clearBlocker();
        });
    });
};