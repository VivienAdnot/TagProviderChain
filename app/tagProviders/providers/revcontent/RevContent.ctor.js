playtemEmbedded.RevContent = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,
    };

    this.settings = {
        providerName: 'revContent',
        $targetContainerElement: $('.ad'),
        modal: true
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};