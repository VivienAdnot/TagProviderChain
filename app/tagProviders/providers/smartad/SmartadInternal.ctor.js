playtemEmbedded.SmartadInternal = function(options) {
    var defaults = {
        providerName: undefined,
        formatId : undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onError: $.noop
    };

    this.settings = {
        scriptUrl: '//www8.smartadserver.com/config.js?nwid=1901',
        siteId : 100394,
        pageName : "home",
        domain: '//www8.smartadserver.com',
        targetClass: 'smartad',
        $targetContainerElement: $('.ad'),
        httpRequestTimeout: 5000,

        cssProperties: {
            "position": "absolute",
            "top": "179px",
            "left": "125px",
            "width": "500px",
            "margin": "0 auto",
            "text-align": "center"
        }
    };

    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};