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