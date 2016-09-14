playtemEmbedded.Spotx.prototype.onAdUnavailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        playtemEmbedded.Core.createTracker("spotx", "onAdUnavailable");

        self.onAdAvailable = playtemEmbedded.Core.Operations.noop;

        self.settings.debug && console.log("onAdUnavailable");
        self.executeCallback("Spotx: no ad", null);
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);