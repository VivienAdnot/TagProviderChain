playtemEmbedded.Template = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,
        hasReward: false,
        outputLanguage: "en-US",
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