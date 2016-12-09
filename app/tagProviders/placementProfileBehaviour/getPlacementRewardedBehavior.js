playtemEmbedded.TagProviders.prototype.getPlacementRewardedBehavior = function () {
    var self = this;

    var rewardManager = new playtemEmbedded.Reward({
        apiKey: self.settings.apiKey
    });

    var adCompleteOrError = function() {
        var always = function() {
            self.windowBlocker.clearBlocker();
        };

        if(self.settings.hasReward == true) {
            rewardManager.execute(function(error, success) {
                always();
            });
        } else {
            always();
        }
    };

    return {
        onAdAvailable : function() {
            self.windowBlocker.setBlocker();
            rewardManager.clear();
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        },

        onAdComplete : adCompleteOrError,

        onError: adCompleteOrError
    };
};