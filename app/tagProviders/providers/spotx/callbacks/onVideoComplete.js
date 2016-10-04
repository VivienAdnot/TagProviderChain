playtemEmbedded.Spotx.prototype.onVideoComplete = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        window.clearTimeout(self.timeouts.videoCompletion.instance);

        playtemEmbedded.Core.track("spotx", "onVideoComplete", function() {
            self.settings.onAdComplete();
        });      
    },

    function() {
        //do nothing
        //playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);