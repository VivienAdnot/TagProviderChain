playtemEmbedded.SpotxOutstream = function(options) {
    var siteIdTest = "85394";
    var siteIdProductionOutstream = "146222";

    this.siteId = (options.debug === true) ? siteIdTest : siteIdProductionOutstream;

    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onAdError: $.noop
    };

    this.spotxInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxOutstream.prototype.execute = function() {
    var self = this;

    self.spotxInternal = new playtemEmbedded.SpotxInternal({
        debug: self.settings.debug,
        siteId: self.siteId,
        apiKey: self.settings.apiKey,
        providerName: "SpotxOutstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.spotxInternal.execute();
};