playtemEmbedded.Reward = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,
        gameType: undefined
    };

    this.settings = {
        scriptUrl: "//api.playtem.com/advertising/services.reward/",
        userId: null
    };

    this.executeCallback = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};