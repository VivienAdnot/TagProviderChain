playtemEmbedded.Reward.prototype.init = function(executeCallback, callback) {
    var self = this;

    $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
    $("#js-rewardOfferingMessage").css("visibility", "hidden");

    if(!self.settings.apiKey) {
        callback("window.apiKey undefined", null);
        return;        
    }

    self.executeCallback = executeCallback;
    playtemEmbedded.Core.globals.playtemRewardText = self;

    callback(null, "success");
};