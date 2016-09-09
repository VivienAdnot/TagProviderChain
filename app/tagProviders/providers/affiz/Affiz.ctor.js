playtemEmbedded.Affiz = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : '315f315f393336_d465200f9f', // todo replace
        httpRequestTimeout: 5000
    };

    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};