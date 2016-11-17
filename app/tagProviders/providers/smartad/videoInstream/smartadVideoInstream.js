playtemEmbedded.SmartadVideoInstream = function(options) {
    var defaults = {
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop
    };

    this.settings = {
        formatId : 41349
    };

    this.smartadInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SmartadVideoInstream.prototype.execute = function() {
    var self = this;

    self.smartadInternal = new playtemEmbedded.SmartadInternal({
        apiKey: self.settings.apiKey,
        formatId: self.settings.formatId,
        providerName: "SmartadVideoInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable
    });

    self.smartadInternal.execute();
};