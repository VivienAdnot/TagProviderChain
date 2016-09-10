playtemEmbedded.BackgroundTasks = function(options) {
    var defaults = {
        apiKey: undefined,
        gameType: undefined,
        hasReward: false
    };

    this.settings = {

    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.BackgroundTasks.prototype = {
    runAllTasks : function() {
        var self = this;

        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey,
                gameType: self.settings.gameType
            });

            rewarder.run();
        }
    }
};