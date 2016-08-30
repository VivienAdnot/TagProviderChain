playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        providers : []
    };

    this.settings = {
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults); 

    // this.providers = [
    //     playtemEmbedded.Smartad
    // ];
};