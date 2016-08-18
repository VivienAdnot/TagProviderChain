playtemEmbeddedApp.TagProviderChain.Template.Reward.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        if(error != null) {
            // handle error
        }

        if(!apiKey) {
            console.log("apiKey undefined");
            return;        
        }

        window.addEventListener("message", self.userIdMessageHandler, false);

        window.parent.postMessage("playtem:smartad:userId", "*");
    });
};