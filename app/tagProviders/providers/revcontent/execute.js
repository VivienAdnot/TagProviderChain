playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    var startWatch = function() {
        self.watchAdCreation(function(adStartedStatus) {
            (adStartedStatus) ? self.onAdAvailable() : self.onAdUnavailable();
        });
    };

    var initialize = function() {
        self.init(function(status) {
            if(status === false) {
                self.onAdUnavailable();
                return;
            }

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  playtemEmbedded.AppSettings.apiKey,
                eventType: "requestSuccess",
                onAlways: startWatch
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "request",
        onAlways: initialize
    });

    self.timeoutTimer = window.setTimeout(function () {
        self.onAdAvailable = $.noop;
        self.onAdUnavailable = $.noop;
        self.onAdComplete = $.noop;

        self.onError(playtemEmbedded.AppSettings.providerErrorTypes.timeout);
    }, playtemEmbedded.AppSettings.providerTimeout);
};