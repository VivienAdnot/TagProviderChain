playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        self.watchAdCreation()
        .done(self.onAdAvailable)
        .fail(self.onAdUnavailable);
    });
};