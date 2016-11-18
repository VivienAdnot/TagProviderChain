playtemEmbedded.TagProviders.prototype.getPlacementOutstreamBehavior = function () {
    var self = this;

    return {
        onAdAvailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");

            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey
                });

                rewarder.execute()
                .fail(function(error) {
                    playtemEmbedded.Core.log("reward", error);
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