playtemEmbedded.Spotx.prototype.onVideoComplete = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        window.clearTimeout(self.timeouts.videoCompletion.instance);

        self.windowBlocker.clearBlocker();

        playtemEmbedded.Core.createTracker("spotx", "onVideoComplete");
    },

    function() {
        //do nothing
        //playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);