playtemEmbedded.VexigoInstream = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onAdError: $.noop
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

playtemEmbedded.VexigoInstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "http://search.spotxchange.com/vast/2.00/168105?"
        + "VPAID=1"
        + "&content_page_url="
        + "&cb=" + playtemEmbedded.Core.Date.getCurrentTimestamp()
        + "&player_width=" + "500"
        + "&player_height=" + "300"
        + "&vid_duration=" + "30"
        + "&vid_url=" +
        + "&vid_id="
        + "&vid_title="
        + "&vid_description=";
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "VexigoInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};