var playtemEmbedded = {};

playtemEmbedded.App = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        hasReward: false
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.App.prototype.execute = function() {
    var self = this;

    var templateSetup = new playtemEmbedded.Template({
        hasReward: self.settings.hasReward
    });

    templateSetup.setup();

    var tagProviders = new playtemEmbedded.TagProviders();
    tagProviders.execute(function(error, result) {
        console.log(error, result);
    });
};