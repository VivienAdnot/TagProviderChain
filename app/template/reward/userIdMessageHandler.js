playtemEmbedded.Reward.prototype.userIdMessageHandler = function(postMessage) {
    var self = playtemEmbedded.Core.globals.playtemRewardContext;
    var playtemIdentifier = "playtem:js:";

    if(!postMessage || !postMessage.data) {
        self.executeCallback("invalid postmessage", null);
    }

    var userIdMessage = postMessage.data;

    if(userIdMessage.indexOf(playtemIdentifier) != 0) {
        return;
    }

    var checkUserIsNumber = function() {
        //todo
    };

    var extractUserId = function() {
        return userIdMessage.substring(playtemIdentifier.length);
    };

    self.userId = extractUserId();

    self.getReward(self.executeCallback);
};