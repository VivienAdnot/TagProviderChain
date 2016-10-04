playtemEmbedded.Spotx.prototype.onAdAvailable = playtemEmbedded.Core.Operations.onceProxy(
    function() {
        var self = this;
        
        playtemEmbedded.Core.track("spotx", "onAdAvailable", function() {
            self.settings.onAdAvailable();
        });
    },

    function() {
        playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
    }
);