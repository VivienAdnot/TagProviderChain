playtemEmbeddedApp.TagProviderChain.Template.Reward.userIdMessageHandler = function(response, callback) {
    var self = this;

    var userIdMessage = postMessage.data;
    if(!userIdMessage) {
        console.log("userId undefined");
        return;
    }

    var playtemIdentifier = "playtem:js:";
    if(userIdMessage.indexOf(playtemIdentifier) != 0) {
        //handle error
    }

    var userId = userIdMessage.substring(playtemIdentifier.length);
};