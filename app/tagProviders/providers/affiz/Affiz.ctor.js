playtemEmbedded.Affiz = function(options) {
    var siteIdProduction = '315f315f32333439_8d31ea22dd';
    var siteIdTest = '315f315f32333530_68dafd7974';

    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        providerName: 'affiz',
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : siteIdProduction,
        clientId: "12345", // TBD
        $targetContainerElement: $('.ad'),
        modal: true,
        httpRequestTimeout: 30000,
        sendEvents: {
            messageCloseWindow : "closeAdWindow"
        }
    };

    playtemEmbedded.Core.globals.affizContext = undefined;

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.adFound = false;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        this.settings.siteId = siteIdTest;
    }
};