playtemEmbedded.SpotxInstream = function(options) {
    this.siteId = "147520";

    var defaults = {
        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {};

    this.spotxInternal = null;

    $.extend(defaults, options);
    $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxInstream.prototype.execute = function() {
    var self = this;

    self.spotxInternal = new playtemEmbedded.SpotxInternal({
        siteId: self.siteId,
        providerName: "SpotxInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError
    });

    self.spotxInternal.execute();
};