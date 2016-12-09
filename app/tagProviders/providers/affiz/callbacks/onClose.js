playtemEmbedded.Affiz.prototype.onClose = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    var requestCloseWindow = function() {
        playtemEmbedded.AppSettings.$closeImgElement.click();
    };

    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "onAdClosed",
        onAlways: requestCloseWindow
    });
};