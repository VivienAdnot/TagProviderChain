playtemEmbedded.Spotx.prototype.init = function(executeCallback, callback) {
    var self = this;

    self.executeCallback = executeCallback;
    self.createTarget();

    self.injectScript(function(error, result) {
        if(error) {
            callback("Spotx injectScript error: " + errorMessage, null);
            return;
        }

        self.settings.debug && console.log("Spotx script loaded");
        callback(null, "success");
    });
};