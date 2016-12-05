playtemEmbedded.SmartadInternal.prototype.execute = function(callback) {
    var self = this;

    var onLoadHandler = function(result) {
        (result && result.hasAd === true) ? self.onAdAvailable() : self.onAdUnavailable();
    };

    var execute = function() {
        sas.setup({
            domain: self.settings.domain,
            async: true,
            renderMode: 0
        });

        sas.call("onecall",
            {
                siteId: self.settings.siteId,
                pageName: self.settings.pageName,
                formatId: self.settings.formatId
            },
            {
                onLoad: function(result) {
                    onLoadHandler(result);
                }
            }
        );

        self.render();
    };

    var initialize = function() {
        self.init(function(error) {
            if(error) {
                self.onAdUnavailable();
                return;
            }

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onAlways: execute
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
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