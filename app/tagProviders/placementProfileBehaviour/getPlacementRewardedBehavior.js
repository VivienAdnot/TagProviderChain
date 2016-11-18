playtemEmbedded.TagProviders.prototype.getPlacementRewardedBehavior = function () {
    var self = this;

    var adCompleteOrError = function() {
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
    };

    return {
        onAdAvailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
            self.windowBlocker.setBlocker();
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        },

        onAdComplete : adCompleteOrError,

        onError: adCompleteOrError
    };
};