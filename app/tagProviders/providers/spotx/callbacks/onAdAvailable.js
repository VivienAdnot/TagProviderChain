playtemEmbedded.Spotx.prototype.onAdAvailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        playtemEmbedded.Core.createTracker("spotx", "onAdAvailable");
        self.windowBlocker.setBlocker();
        self.executeCallback(null, "success");
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);