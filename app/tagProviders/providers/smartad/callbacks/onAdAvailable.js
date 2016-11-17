playtemEmbedded.Smartad.prototype.onAdAvailable = function() {
    var self = this;
    
    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
    .done(self.settings.onAdAvailable)
    .fail(self.settings.onError);    
};