playtemEmbedded.Smartad = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: '//www8.smartadserver.com/config.js?nwid=1901',
        siteId : 100394,
        pageName : "home",
        formatId : 42149,
        domain: '//www8.smartadserver.com',
        target: '.smartad',
        httpRequestTimeout: 3000
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};