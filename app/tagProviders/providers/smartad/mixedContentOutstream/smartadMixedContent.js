playtemEmbedded.SmartadMixedContent = function(options) {
    var defaults = {
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop
    };

    this.settings = {
        formatId : 42149
    };

    this.smartadInternal = null;

    $.extend(defaults, options);
    $.extend(this.settings, defaults);
};

playtemEmbedded.SmartadMixedContent.prototype.execute = function() {
    var self = this;

    self.smartadInternal = new playtemEmbedded.SmartadInternal({
        apiKey: self.settings.apiKey,
        formatId: self.settings.formatId,
        providerName: "SmartadMixedContent",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable
    });

    self.smartadInternal.execute();
};