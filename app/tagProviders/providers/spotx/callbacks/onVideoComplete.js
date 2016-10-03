playtemEmbedded.Spotx.prototype.onVideoComplete = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        window.clearTimeout(self.timeouts.videoCompletion.instance);

        playtemEmbedded.Core.createTracker("spotx", "onVideoComplete");

        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey
            });

            rewarder.execute(function(error, success) {
                self.windowBlocker.clearBlocker();
            });
        } else {
            self.windowBlocker.clearBlocker();
        }        
    },

    function() {
        //do nothing
        //playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);