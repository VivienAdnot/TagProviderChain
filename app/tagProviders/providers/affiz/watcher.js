playtemEmbedded.Affiz.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adCloseDeferred = $.Deferred();

    AFFIZVIDEO.init({
        site_id: self.settings.siteId,
        clientid: self.settings.clientid,
        modal: self.settings.modal,

        load_callback: function() {
            isAdAvailableDeferred.resolve();
        },
        noads_callback: function() {
            isAdAvailableDeferred.reject();
        },
        complete_callback: function() {
            adCompleteDeferred.resolve();
        },
        close_callback: function() {
            adCloseDeferred.resolve();
        }
    });

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdClose: adCloseDeferred.promise()
    };
};