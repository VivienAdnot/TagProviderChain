playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request");

    self.init(function(success) {
        if(!success) {
            self.onScriptLoadingError();
            return;
        }
        
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess");

        self.watchAdCreation(function(adStartedStatus) {
            if(adStartedStatus) {
                self.onAdAvailable();
                return;
            }
            
            self.onAdUnavailable();
        });
    });
};