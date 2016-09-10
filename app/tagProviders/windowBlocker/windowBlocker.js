playtemEmbedded.WindowBlocker = function(options) {
    var defaults = {

    };

    this.settings = {
        $blockableElement : $(".js-closeAd"),
        crossFadeInDuration: 800
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.WindowBlocker.prototype = {
    setBlocker : function() {
        var self = this;
        self.settings.$blockableElement.hide();
    },

    clearBlocker: function() {
        var self = this;
        self.settings.$blockableElement.fadeIn(self.settings.crossFadeInDuration);
    }
};