playtemEmbedded.AffizTest = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: 'Test',
        siteId : '315f315f32333530_68dafd7974'
    };

    this.affizInternal = null;

    $.extend(defaults, options);
    $.extend(this.settings, defaults);
};

playtemEmbedded.AffizTest.prototype.execute = function() {
    var self = this;

    self.affizInternal = new playtemEmbedded.AffizInternal(self.settings);
    self.affizInternal.execute();
};