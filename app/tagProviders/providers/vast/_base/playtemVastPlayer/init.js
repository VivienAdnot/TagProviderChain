playtemEmbedded.PlaytemVastPlayer.prototype.init = function(callback) {
    var self = this;

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.playerPosition);
    };

    createTarget();

    var injectScript = function() {
        playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
            callback(error);
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: injectScript,
        onFail: self.settings.onAdUnavailable
    });
};