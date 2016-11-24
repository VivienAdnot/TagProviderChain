playtemEmbedded.Reward.prototype.userIdMessageHandler = function(postMessage) {
    var self = playtemEmbedded.Core.globals.playtemRewardContext;
    var playtemIdentifier = "playtem:js:";

    try {
        var userIdMessage = postMessage.data;

        if(userIdMessage.indexOf(playtemIdentifier) == 0) {
            self.userId = userIdMessage.substring(playtemIdentifier.length);
            self.getReward(self.executeCallback);

            window.removeEventListener("message", self.userIdMessageHandler, false);
        }
    }
    
    catch(e) {
        return;
    }
};