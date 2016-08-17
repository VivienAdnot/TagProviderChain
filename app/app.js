var playtemEmbeddedApp = {};

playtemEmbeddedApp.TagProviderChain = function(options) {

    var defaults = {
        debug: false
    };

    this.settings = {};
    
    this.defaults = $.extend(this.defaults, options);
    this.settings = $.extend(this.settings, this.defaults);    
};