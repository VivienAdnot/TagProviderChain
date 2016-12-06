playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        appCallbacks: {}
    };

    this.settings = {};
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};