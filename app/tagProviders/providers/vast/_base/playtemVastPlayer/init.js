playtemEmbedded.PlaytemVastPlayer.prototype.init = function(callback) {
    var self = this;

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.playerPosition);
    };

    createTarget();

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request");

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        callback(error);
    });
};