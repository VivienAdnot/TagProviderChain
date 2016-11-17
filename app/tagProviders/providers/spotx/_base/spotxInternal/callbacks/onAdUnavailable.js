playtemEmbedded.SpotxInternal.prototype.onAdUnavailable = function() {
    var self = this;
    
    if(self.adFound === true) {
        self.onError();
    }
    
    else {
        playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
        .done(self.settings.onAdUnavailable)
        .fail(self.settings.onError);
    }
};