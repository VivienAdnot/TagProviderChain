playtemEmbedded.CloseImgWatcher = function(options) {
    var defaults = {

    };

    this.settings = {
        $element : $(".js-closeAd"),
        sendEvents: {
            closeWindow : "closeAdWindow"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.CloseImgWatcher.prototype = {
    watchClick : function() {
        var self = this;

        self.settings.$element.click(function () {
            window.parent.postMessage(self.settings.sendEvents.closeWindow, "*");
        });
    }
};