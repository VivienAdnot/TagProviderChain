playtemEmbedded.SpotxInternal.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adErrorDeferred = $.Deferred();

    window.spotXCallback = function(videoStatus) {
        if(videoStatus === true) {
            adCompleteDeferred.resolve();
        }
        
        else {
            if(adAvailableDeferred.state() == "pending") {
                isAdAvailableDeferred.reject();
            }
            // if I detect a player with my watcher and then I receive this, it's a video error
            else {
                adErrorDeferred.resolve();
            }
        }
    };

    var condition = function() {
        var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        return isVideoPlayerDefined && isVideoPlayerVisible;
    };

    playtemEmbedded.Core.watch(condition)
    .done(function() {
        isAdAvailableDeferred.resolve();
    })
    .fail(function() {
        isAdAvailableDeferred.reject();
    });

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdError: adErrorDeferred.promise()
    };
};