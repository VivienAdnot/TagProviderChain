playtemEmbedded.Reward.prototype.init = function(executeCallback, initCallback) {
    var self = this;

    if(!playtemEmbedded.AppSettings.apiKey) {
        initCallback("window.apiKey undefined", null);
        return;
    }

    self.executeCallback = executeCallback;

    //hideElements();
    playtemEmbedded.Core.globals.playtemRewardContext = self;

    initCallback(null, "success");
};