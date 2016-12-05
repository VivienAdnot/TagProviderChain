playtemEmbedded.SmartadInternal.prototype.onAdUnavailable = function() {
    var self = this;
    window.clearTimeout(self.timeoutTimer);

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onAlways: self.settings.onAdUnavailable
    });
};