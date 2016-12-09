playtemEmbedded.Affiz = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: "affiz",
        siteId: "315f315f32333439_8d31ea22dd",
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        clientId: "12345", // TBD
        $targetContainerElement: $('.ad'),
        modal: true
    };

    playtemEmbedded.Core.globals.affizContext = undefined;

    $.extend(defaults, options);
    $.extend(this.settings, defaults);

    this.timeoutTimer = null;
};