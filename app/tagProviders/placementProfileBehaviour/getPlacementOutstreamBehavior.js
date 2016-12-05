playtemEmbedded.TagProviders.prototype.getPlacementOutstreamBehavior = function () {
    var self = this;

    return {
        onAdAvailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");

            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({ apiKey: self.settings.apiKey });
                rewarder.execute($.noop);
            }
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
        },

        onComplete: function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.defaultEnd, "*");
        }
    };
};