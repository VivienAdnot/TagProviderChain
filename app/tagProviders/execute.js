playtemEmbedded.TagProviders.prototype.execute = function (callback) {
    var self = this;

    self.fetchAdvert(function (error, result) {
        if(result == "success") {
            window.parent.postMessage("playtem:smartad:adAvailable", "*");
        } else {
            window.parent.postMessage("playtem:smartad:adUnavailable", "*");
        }

        if(typeof callback == "function") {
            callback(error, result);
        }
    });
};