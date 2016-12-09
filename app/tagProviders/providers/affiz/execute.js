playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    var initAffiz = function() {
        try {
            AFFIZVIDEO.init({
                site_id: self.settings.siteId,
                clientid: self.settings.clientid,
                modal: self.settings.modal,

                load_callback: self.onAdAvailable,
                noads_callback: self.onAdUnavailable,
                complete_callback: self.onAdComplete,
                close_callback: self.onClose
            });
        } catch(e) {
            self.onError(playtemEmbedded.AppSettings.providerErrorTypes.internal);
        }
    };

    window.avAsyncInit = function() {
        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  playtemEmbedded.AppSettings.apiKey,
            eventType: "requestSuccess",
            onAlways: initAffiz
        });
    };

    self.init();

    self.timeoutTimer = window.setTimeout(function () {
        self.onAdAvailable = $.noop;
        self.onAdUnavailable = $.noop;
        self.onAdComplete = $.noop;

        self.onError(playtemEmbedded.AppSettings.providerErrorTypes.timeout);
    }, playtemEmbedded.AppSettings.providerTimeout);
};