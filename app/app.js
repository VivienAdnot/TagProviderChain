var playtemEmbedded = {};

playtemEmbedded.App = function(options) {
    var defaults = {
        /*mandatory*/
        apiKey: undefined,
        hasReward: false,
        providers: [],
        gameType: undefined,
        /* mandatory */
        outputLanguage: undefined
    };

    this.settings = {

    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.App.prototype.execute = function() {
    var self = this;

    var templateSetup = new playtemEmbedded.Template({
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType
    });

    templateSetup.setup();

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers
    });
    
    tagProviders.execute(function(error, result) {
        console.log(error, result);
    });
};