playtemEmbedded.Spotx.prototype.detectOnAdStarted = function(callback) {
    var self = this;

    self.poll = window.setInterval(function() {
        // refresh every round
        var $playerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isPlayerDefined = $playerContainer.length == 1;
        var isPlayerVisible = $playerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        if(isPlayerDefined && isPlayerVisible) {
            window.clearInterval(self.poll);
            window.clearTimeout(self.timeouts.videoAvailability.instance);

            callback(true);
        }
        
    }, 200);

    self.timeouts.videoAvailability.instance = window.setTimeout(function () {
        window.clearInterval(self.poll);
        callback(false);
    }, self.timeouts.videoAvailability.duration);        
};