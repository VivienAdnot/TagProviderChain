playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    var callbackFlag = false;

    window.spotXCallback = function(videoStatus) {
        if(videoStatus === true) {
            self.onAdComplete();
        }
        
        else {
            if(callbackFlag === false) {
                callbackFlag = true;
                self.onAdUnavailable();
            }
        }
    };

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        var condition = function() {
            var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
            var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
            var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

            return isVideoPlayerDefined && isVideoPlayerVisible;
        };

        playtemEmbedded.Core.watch(condition)
        .done(function() {
            if(callbackFlag === false) {
                callbackFlag = true;
                self.onAdAvailable();
            }
        })
        .fail(function() {
            if(callbackFlag === false) {
                callbackFlag = true;
                self.onAdUnavailable();
            }
        });
    });
};