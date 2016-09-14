playtemEmbedded.Affiz = function(options) {
    var defaults = {
    };

    this.settings = {
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : '315f315f32333530_68dafd7974',
        target: 'iframeAdsAffiz',
        $targetContainerElement: $('.ad'),
        httpRequestTimeout: 5000    
    };

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};