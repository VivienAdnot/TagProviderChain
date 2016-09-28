var playtemEmbedded = {};

playtemEmbedded.App = function(options) {
    var defaults = {
        /*mandatory*/
        apiKey: undefined,
        hasReward: false,
        providers: [],
        gameType: undefined,
        /* mandatory */
        outputLanguage: undefined,
        debug: false
    };

    this.settings = {

    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.App.prototype.execute = function() {
    var self = this;

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers,
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType,
        debug: self.settings.debug
    });
    
    tagProviders.execute(playtemEmbedded.Core.Operations.noop);

    var closeBtnWatcher = new playtemEmbedded.CrossManager();
    closeBtnWatcher.watchClose();
};