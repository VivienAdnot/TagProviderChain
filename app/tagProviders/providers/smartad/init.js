playtemEmbedded.Smartad.prototype.init = function(callback) {
    var self = this;

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(!error && data == "success") {
            $(".ad").append("<div class == 'smartad'></div>");
            callback(null, "success");
            return;
        }
        
        callback("smartad: script couldn't be loaded", null);
    });        
};