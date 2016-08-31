playtemEmbedded.Facebook = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        $targetContainerElement: $('.ad'),
        httpRequestTimeout: 5000
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};