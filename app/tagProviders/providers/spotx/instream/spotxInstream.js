playtemEmbedded.SpotxInstream = function(options) {
    this.siteId = "147520";

    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop,
        onTimeout: $.noop
    };

    this.spotxInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxInstream.prototype.execute = function() {
    var self = this;

    self.spotxInternal = new playtemEmbedded.SpotxInternal({
        debug: self.settings.debug,
        siteId: self.siteId,
        apiKey: self.settings.apiKey,
        providerName: "SpotxInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError
        // it makes no sense to implement it in spotx
        //onTimeout: self.settings.onTimeout
    });

    self.spotxInternal.execute();
};