playtemEmbedded.Spotx.prototype.onAdAvailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        self.onAdUnavailable = playtemEmbedded.Core.Operations.noop;

        playtemEmbedded.Core.createTracker("spotx", "onAdAvailable");

        self.windowBlocker.setBlocker();

        self.timeouts.videoCompletion.instance = window.setTimeout(function () {
            self.onVideoComplete();
        }, self.timeouts.videoCompletion.duration);

        self.settings.debug && console.log("onAdAvailable");
        self.executeCallback(null, "success");
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);