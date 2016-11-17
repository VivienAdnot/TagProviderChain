playtemEmbedded.Affiz.prototype.onClose = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    var closeWindow = function() {
        window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
    };

    playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "onAdClosed")
    .done(closeWindow)
    .fail(self.settings.onError);
};