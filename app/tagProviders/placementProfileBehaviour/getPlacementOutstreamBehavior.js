playtemEmbedded.TagProviders.prototype.getPlacementOutstreamBehavior = function () {
    var self = this;   

    return {
        onAdAvailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");

            if(self.settings.hasReward == true) {
                var rewardManager = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey
                });

                rewardManager.clear();

                rewardManager.execute(function(error, success) {
                    // nothing to do
                });
            }
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        },

        onAdComplete : $.noop,

        onError: function() {
            //request close window
            window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
        }
    };
};