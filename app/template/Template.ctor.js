playtemEmbedded.Template = function(options) {
    var defaults = {
        apiKey: undefined,
        gameType: undefined,
        hasReward: false,
        outputLanguage: "en-US",
        debug: false,
    };

    this.settings = {
        scripts: {
            setupTemplate: "//static.playtem.com/templates/js/templatedisplay.js",
            reward: "reward.js"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};