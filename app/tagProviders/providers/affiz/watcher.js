playtemEmbedded.Affiz.prototype.watcher = function() {
    var self = this;

    var watcherPromises = {
        isAdAvailable: $.Deferred,
        videoComplete: $.Deferred,
        videoClose: $.Deferred
    };

    AFFIZVIDEO.init({
        site_id: self.settings.siteId,
        clientid: self.settings.clientid,
        modal: self.settings.modal,

        load_callback: function() {
            watcherPromises.isAdAvailable.resolve();
        },
        noads_callback: function() {
            watcherPromises.isAdAvailable.reject();
        },
        complete_callback: function() {
            watcherPromises.videoComplete.resolve();
        },
        close_callback: function() {
            watcherPromises.videoClose.resolve();
        }
    });

    return watcherPromises;
};