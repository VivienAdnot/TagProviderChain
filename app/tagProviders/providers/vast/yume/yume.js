playtemEmbedded.Yume = function(options) {
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

playtemEmbedded.Yume.prototype.execute = function() {
    var self = this;

    // var buildTag = function() {
    //     return "//[YuMe_TSE_WILL_REPLACE_THIS]" + ".yumenetworks.com/dynamic_preroll_playlist.vast2xml?"
    //     + "domain=" + "[YuMe_TSE_WILL_REPLACE_THIS]"
    //     + "&delivery_point=" + "[YuMe_TSE_WILL_REPLACE_THIS]"
    //     + "&domain_app_type=" + "[YuMe_TSE_WILL_REPLACE_THIS]"
    //     +" &height=" + "300"
    //     + "&width=" + "500"
    //     + "&source_url=[PARTNER_REPLACE_THIS]"
    //     + "&rand=" + playtemEmbedded.Core.Date.getCurrentTimestamp()
    //     + "&ad_length=" + "30"
    //     + "&dnt=" + "0";
    // };

    var buildTag = function() {
        return "http://shadow01.yumenetworks.com/dynamic_preroll_playlist.vast2xml?domain=1552hCkaKYjg&delivery_point=PC&domain_app_type=Web&height=300&width=250&source_url=www.yume.com&rand=222&ad_length=60&dnt=0";
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "Yume",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};