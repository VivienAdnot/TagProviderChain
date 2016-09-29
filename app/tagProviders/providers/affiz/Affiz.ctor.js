playtemEmbedded.Affiz = function(options) {
    var siteIdProduction = '315f315f32333439_8d31ea22dd';
    var siteIdTest = '315f315f32333530_68dafd7974';

    var defaults = {
        debug : false
    };

    this.settings = {
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : siteIdProduction,
        // target: 'iframeAdsAffiz',
        $targetContainerElement: $('.ad'),
        modal: true,
        httpRequestTimeout: 10000
    };

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        this.settings.siteId = siteIdTest;
    }
};