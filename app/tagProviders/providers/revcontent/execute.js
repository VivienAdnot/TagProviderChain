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
        .done(self.onAdAvailable)
        .fail(self.onAdUnavailable);
    });
};