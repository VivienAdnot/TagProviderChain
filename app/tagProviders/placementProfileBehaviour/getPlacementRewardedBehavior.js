playtemEmbedded.TagProviders.prototype.getPlacementRewardedBehavior = function () {
    var self = this;

    var adCompleteOrError = function() {
        var always = function() {
            self.windowBlocker.clearBlocker();
        };

        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey
            });

            rewarder.execute(function(error, success) {
                always();
            });
        } else {
            always();
        }
    };

    return {
        onAdAvailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");
            self.windowBlocker.setBlocker();
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
        },

        // onTimeout: function() {
        //     window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.defaultEnd, "*");
        // },

        onAdComplete : adCompleteOrError,

        onError: adCompleteOrError,        
    };
};