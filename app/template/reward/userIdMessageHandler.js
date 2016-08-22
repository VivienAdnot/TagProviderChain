playtemEmbedded.Reward.prototype.userIdMessageHandler = function(postMessage) {
    var self = playtemEmbedded.Core.globals.playtemRewardText;
    var playtemIdentifier = "playtem:js:";

    if(!postMessage || !postMessage.data) {
        self.executeCallback("invalid postmessage", null);
    }

    var userIdMessage = postMessage.data;

    if(userIdMessage.indexOf(playtemIdentifier) != 0) {
        //handle error
    }

    var checkUserIsNumber = function() {
        //todo
    };

    var extractUserId = function() {
        return userIdMessage.substring(playtemIdentifier.length);
    };

    self.settings.userId = extractUserId();

    self.getReward(self.executeCallback);
};