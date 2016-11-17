playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    self.init()
        .fail(self.settings.onAdUnavailable)
        .done(function() {
            AFFIZVIDEO.init({
                site_id: self.settings.siteId,
                clientid: self.settings.clientid,
                modal: self.settings.modal,

                load_callback: self.onAdAvailable,
                noads_callback: self.onAdUnavailable,
                complete_callback: self.onAdComplete,
                close_callback: self.onClose
            });
        });
};