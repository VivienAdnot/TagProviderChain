playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    var initialize = function() {
        self.init(function(status) {
            if(status === false) {
                self.settings.onAdUnavailable();
                return;
            }

            var startWatch = function() {
                self.watchAdCreation(function(adStartedStatus) {
                    if(adStartedStatus === true) {
                        self.onAdAvailable();
                        return;
                    }
                    
                    self.onAdUnavailable();
                });
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: startWatch,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};