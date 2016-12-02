playtemEmbedded.TagProviders.prototype.getPlacementOutstreamBehavior = function () {
    var self = this;

    return {
        onAdAvailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");

            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey
                });

                rewarder.execute(function(error, success) {
                    // nothing to do
                });
            }
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
        },

        onAdComplete : $.noop,

        onError: function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.defaultEnd, "*");
        }
    };
};