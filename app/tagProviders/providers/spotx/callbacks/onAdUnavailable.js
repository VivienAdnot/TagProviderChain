playtemEmbedded.Spotx.prototype.onAdUnavailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        playtemEmbedded.Core.track("spotx", "onAdUnavailable", function() {
            self.settings.onAdUnavailable();
        });
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);