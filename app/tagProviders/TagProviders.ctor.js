playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        providers : []
    };

    this.settings = {
        sendEvents: {
            onAdAvailable: "playtem:tagApp:adAvailable",
            onAdUnavailable: "playtem:tagApp:adUnavailable"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};