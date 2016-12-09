playtemEmbedded.SmartadMixedContent = function(options) {
    var defaults = {
        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onError: $.noop
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
        formatId: self.settings.formatId,
        providerName: "SmartadMixedContent",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onError: self.settings.onError
    });

    self.smartadInternal.execute();
};