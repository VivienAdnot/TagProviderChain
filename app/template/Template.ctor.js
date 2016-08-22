playtemEmbedded.Template = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        hasReward: false,
        scripts: {
            setupTemplate: "//static.playtem.com/templates/js/templatedisplay.js",
            reward: "reward.js"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};