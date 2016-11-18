playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {

        var condition = function() {
            var $videoPlayerContainer = $("#revcontent");
            var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
            var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

            return isVideoPlayerDefined && isVideoPlayerVisible;           
        };

        playtemEmbedded.Core.watch(condition)
        .done(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });
    });
};