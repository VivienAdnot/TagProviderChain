playtemEmbedded.RevContent = function(options) {
    var defaults = {
        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: 'revContent',
        $targetContainerElement: $('.ad'),
        modal: true,
        httpRequestTimeout: 3000
    };

    $.extend(defaults, options);
    $.extend(this.settings, defaults);

    this.timeoutTimer = null;
};