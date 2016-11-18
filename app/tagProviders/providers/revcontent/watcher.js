playtemEmbedded.RevContent.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();

    var condition = function() {
        var $videoPlayerContainer = $("#revcontent");
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

        return isVideoPlayerDefined && isVideoPlayerVisible;           
    };

    playtemEmbedded.Core.watch(condition)
    .done(function() {
        isAdAvailableDeferred.resolve();
    })
    .fail(function() {
        isAdAvailableDeferred.reject();
    });

    window.setTimeout(isAdAvailableDeferred.reject, 3000);

    return isAdAvailableDeferred.promise();
};