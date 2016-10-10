playtemEmbedded.Spotx.prototype.onAdUnavailable = function() {
    var self = this;
    
    playtemEmbedded.Core.track("spotx", self.settings.apiKey, "onAdUnavailable", function() {
        self.settings.onAdUnavailable();
    });
};