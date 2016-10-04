playtemEmbedded.Spotx.prototype.init = function(executeCallback, callback) {
    var self = this;

    self.executeCallback = executeCallback;
    self.createTarget();

    self.injectScript(function(error, result) {
        if(error) {
            callback("Spotx injectScript error: " + error, null);
            return;
        }

        callback(null, "success");
    });
};