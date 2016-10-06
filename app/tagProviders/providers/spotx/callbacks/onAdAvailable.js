playtemEmbedded.Spotx.prototype.onAdAvailable = function() {
    var self = this;
    
    playtemEmbedded.Core.track("spotx", "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};