playtemEmbedded.PlaytemVastPlayer.prototype.onAdAvailable = function() {
    var self = this;

    if (self.stateMachine.validateNextState("adAvailable")) {
        self.stateMachine.setState("adAvailable");
    }

    self.adFound = true;
    
    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable", function() {
        self.settings.onAdAvailable();
    });
};