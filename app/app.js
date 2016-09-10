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

    var tasks = new playtemEmbedded.BackgroundTasks({
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType
    });

    tasks.runAllTasks();

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers
    });
    
    tagProviders.execute(playtemEmbedded.Core.Operations.noop);
};