playtemEmbedded.RevContent.prototype.onAdUnavailable = function() {
    var self = this;

    if(self.adFound === true) {
        self.onAdError();
    }
    
    else {
        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "onAdUnavailable",
            onDone: self.settings.onAdUnavailable,
            onFail: self.settings.onError
        });
    }
};