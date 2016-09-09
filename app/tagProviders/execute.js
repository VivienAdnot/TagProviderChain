playtemEmbedded.TagProviders.prototype.execute = function (callback) {
    var self = this;

    self.fetchAdvert(function (error, result) {
        if(result == "success") {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
        } else {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        }

        if(typeof callback == "function") {
            callback(error, result);
        }
    });
};