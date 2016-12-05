playtemEmbedded.SmartadMixedContent = function(options) {
    var defaults = {
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onError: $.noop
    };

    this.settings = {
        formatId : 42149
    };

    this.smartadInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SmartadMixedContent.prototype.execute = function() {
    var self = this;

    self.smartadInternal = new playtemEmbedded.SmartadInternal({
        apiKey: self.settings.apiKey,
        formatId: self.settings.formatId,
        providerName: "SmartadMixedContent",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onError: self.settings.onError
    });

    self.smartadInternal.execute();
};