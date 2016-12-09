playtemEmbedded.SpotxInternal.prototype.onAdUnavailable = function() {
    var self = this;
    
    if(self.adFound === true) {
        self.onError();
    }
    
    else {
        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  playtemEmbedded.AppSettings.apiKey,
            eventType: "onAdUnavailable",
            onAlways: self.settings.onAdUnavailable
        });
    }
};