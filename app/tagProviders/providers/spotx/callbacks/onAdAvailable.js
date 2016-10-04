playtemEmbedded.Spotx.prototype.onAdAvailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        playtemEmbedded.Core.track("spotx", "onAdAvailable");
        self.windowBlocker.setBlocker();
        self.executeCallback(null, "success");
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);