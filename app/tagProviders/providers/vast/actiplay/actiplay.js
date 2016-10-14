playtemEmbedded.Actiplay = function(options) {
    var defaults = {
        debug: false,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        vastTag : "https://pubads.g.doubleclick.net/gampad/ads?sz=450x400&iu=/1163333/EXT_Playtem_InGame_Preroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=&description_url=&correlator=[timestamp]" + playtemEmbedded.Core.Date.getCurrentTimestamp()
    };

    this.vastPlayer = undefined;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        // nothing to do
    }
};

playtemEmbedded.Actiplay.prototype.execute = function() {
    var self = this;

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: self.settings.vastTag,

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError
    });

    self.vastPlayer.execute();
};