var playtemEmbeddedApp = {};

playtemEmbeddedApp.TagProvider = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        hasReward: false
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbeddedApp.TagProvider.prototype.execute = function() {
    var self = this;

    var templateSetup = new playtemEmbeddedApp.Template({
        hasReward: self.settings.hasReward
    });
    
    templateSetup.setup();
};