playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        appCallbacks: {}
    };

    this.settings = {};
    
    $.extend(defaults, options);
    $.extend(this.settings, defaults);
};