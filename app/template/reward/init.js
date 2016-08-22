playtemEmbedded.Reward.prototype.init = function(executeCallback, callback) {
    var self = this;

    if(!self.settings.apiKey) {
        callback("window.apiKey undefined", null);
        return;        
    }

    self.executeCallback = executeCallback;
    playtemEmbedded.Core.globals.playtemRewardText = self;

    callback(null, "success");
};