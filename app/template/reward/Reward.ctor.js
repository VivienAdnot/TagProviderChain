playtemEmbeddedApp.TagProviderChain.Template.Reward = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: "reward.js"
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

playtemEmbeddedApp.TagProviderChain.Template.Reward.init = function(callback) {
    var self = this;

    playtemEmbeddedApp.TagProviderChain.Core.injectScript(self.settings.scriptUrl, callback);
};

playtemEmbeddedApp.TagProviderChain.Template.Reward.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        if(error != null) {
            // handle error
        }

        window.addEventListener("message", responseHandler, false);
    });
};