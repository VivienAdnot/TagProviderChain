playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    window.avAsyncInit = function() {
        var initAffiz = function() {
            AFFIZVIDEO.init({
                site_id: self.settings.siteId,
                clientid: self.settings.clientid,
                modal: self.settings.modal,

                load_callback: self.onAdAvailable,
                noads_callback: self.onAdUnavailable,
                complete_callback: self.onAdComplete,
                close_callback: self.onClose
            });
        }

        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "requestSuccess",
            onDone: initAffiz,
            onFail: self.settings.onAdUnavailable
        });
    };

    self.init();

    self.timeoutTimer = window.setTimeout(function () {
        self.onAdAvailable = $.noop;
        self.onAdUnavailable = $.noop;
        self.onAdComplete = $.noop;

        self.settings.onTimeout();
    }, playtemEmbedded.AppSettings.providerTimeout);
};