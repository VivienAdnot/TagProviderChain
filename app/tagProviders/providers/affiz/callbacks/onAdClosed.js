playtemEmbedded.Affiz.prototype.onClose = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    var closeWindow = function() {
        window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
    };

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdClosed", function() {
        closeWindow();
    });
};