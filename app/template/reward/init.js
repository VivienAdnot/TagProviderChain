playtemEmbedded.Reward.prototype.init = function(executeCallback, callback) {
    var self = this;

    if(self.settings.gameType == "desktop") {
        //reward img uri
        $("#rewardImageUri").css("visibility", "hidden");
        //reward img name
        $("#rewardName").css("visibility", "hidden");

        $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
        $("#js-rewardOfferingMessage").css("visibility", "hidden");

    } else if(self.settings.gameType == "mobile") {
        //reward img uri
        $(".ad__reward__image").css("visibility", "hidden");
        $(".ad__reward__offerMessage__rewardName").css("visibility", "hidden");
        $(".ad__header__title").css("visibility", "hidden");
        $("#js-rewardOfferingMessage").css("visibility", "hidden");

    } else {
        // todo handle error
        return;
    }

    if(!self.settings.apiKey) {
        callback("window.apiKey undefined", null);
        return;        
    }

    self.executeCallback = executeCallback;
    playtemEmbedded.Core.globals.playtemRewardContext = self;

    callback(null, "success");
};