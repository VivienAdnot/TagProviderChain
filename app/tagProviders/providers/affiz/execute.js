playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    window.avAsyncInit = function() {
        AFFIZVIDEO.init({
            site_id: self.settings.siteId,
            clientid: self.settings.clientid,
            load_callback: self.onAdAvailable,
            noads_callback: self.onAdUnavailable,
            complete_callback: self.onAdComplete,
            close_callback: self.onClose,
            modal: self.settings.modal
        });
    };

    self.init();
};