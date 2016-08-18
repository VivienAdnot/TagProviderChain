var playtemEmbeddedApp = {};

playtemEmbeddedApp.TagProviderChain = function(options) {

    var defaults = {
        debug: false
    };

    this.settings = {
        hasReward: false
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};