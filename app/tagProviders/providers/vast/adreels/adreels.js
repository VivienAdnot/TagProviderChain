playtemEmbedded.Adreels = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        top: 168,
        width: 530,
        height: 350
    };

    this.vastPlayer = undefined;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        // nothing to do
    }
};

playtemEmbedded.Adreels.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "http://vid.springserve.com/vast/39549?"
            + "w=" + self.settings.width
            + "&h=" + self.settings.height
            + "&url=" + "poc.playtem.com" // + "{{URL}}"
            + "&cb=" + playtemEmbedded.Core.Date.getCurrentTimestamp() // cache buster
            + "&desc=" // + "a" // + "{{DESCRIPTION}}"
            + "&ic=" // + "IAB24" // + "{{IAB_CATEGORY}}"
            + "&dur=" // + 500 // "{{DURATION}}"
            + "&ap=" // + 1 // "{{AUTOPLAY}}"
            + "&vid=" // + 1 // + "{{VIDEO_ID}}";
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "Adreels",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError,

        playerPosition: {
            top: self.settings.top,
            width: self.settings.width,
            height: self.settings.height
        }        
    });

    self.vastPlayer.execute();
};