playtemEmbedded.Spotx.prototype.onAdUnavailable = function() {
    var self = this;
    
    playtemEmbedded.Core.track("spotx", "onAdUnavailable", function() {
        self.settings.onAdUnavailable();
    });
};