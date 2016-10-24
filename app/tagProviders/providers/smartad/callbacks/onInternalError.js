playtemEmbedded.Smartad.prototype.onInternalError = function() {
    var self = this;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onInternalError", function() {
        self.settings.onAdUnavailable();
    });
};