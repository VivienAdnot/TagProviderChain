playtemEmbedded.Affiz = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onTimeout: $.noop
    };

    this.settings = {
        providerName: 'affiz',
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : '315f315f32333439_8d31ea22dd',
        clientId: "12345", // TBD
        $targetContainerElement: $('.ad'),
        modal: true,
        sendEvents: {
            messageCloseWindow : "closeAdWindow"
        }
    };

    playtemEmbedded.Core.globals.affizContext = undefined;

    this.windowBlocker = new playtemEmbedded.WindowBlocker();

    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};