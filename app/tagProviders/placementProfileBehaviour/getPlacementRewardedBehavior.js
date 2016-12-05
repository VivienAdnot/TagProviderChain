playtemEmbedded.TagProviders.prototype.getPlacementRewardedBehavior = function () {
    var self = this;

    return {
        onAdAvailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");
            self.windowBlocker.setBlocker();
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
        },

        onComplete : function() {
            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey
                });

                rewarder.execute($.noop);
            }

            // wait for the reward to appear on the window
            window.setTimeout(self.windowBlocker.clearBlocker, 1000);
        }
    };
};