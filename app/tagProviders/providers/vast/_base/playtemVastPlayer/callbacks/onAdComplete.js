playtemEmbedded.PlaytemVastPlayer.prototype.onAdComplete = function() {
    var self = this;

    window.clearTimeout(self.timeoutTimer);
    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  playtemEmbedded.AppSettings.apiKey,
        eventType: "onAdComplete",
        onAlways: self.settings.onAdComplete
    });
};