playtemEmbedded.Affiz = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: 'affiz',
        siteId : '315f315f32333439_8d31ea22dd'
    };

    this.affizInternal = null;

    $.extend(defaults, options);
    $.extend(this.settings, defaults);
};

playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    self.affizInternal = new playtemEmbedded.AffizInternal(self.settings);
    self.affizInternal.execute();
};