playtemEmbedded.PlaytemVastInstream = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onAdError: $.noop,
        onTimeout: $.noop
    };

    this.settings = {

    };

    this.vastPlayer = undefined;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        // nothing to do
    }
};

playtemEmbedded.PlaytemVastInstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/rewarded/playtem-vast-wrapper-instream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError,
        onTimeout: self.settings.onTimeout
    });

    self.vastPlayer.execute();
};