playtemEmbedded.Affiz.prototype.execute = function(callback) {
    var self = this;

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);
        self.windowBlocker.setBlocker();
        playtemEmbedded.Core.createTracker("affiz", "onAdAvailable");
        callback(null, "success");
        AFFIZVIDEO.show();
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);
        playtemEmbedded.Core.createTracker("affiz", "onAdUnavailable");
        callback("Affiz: no ad", null);
    };

    var onVideoComplete = function() {
        playtemEmbedded.Core.createTracker("affiz", "onVideoComplete");
        self.windowBlocker.clearBlocker();
    };

    var onCloseCallback = function() {
        alert("close");
    };

    window.avAsyncInit = function() {
        AFFIZVIDEO.init({
            site_id: self.settings.siteId,
            clientid: "12345", // todo set
            load_callback: onAdAvailable,
            noads_callback: onAdUnavailable,
            complete_callback: onVideoComplete,
            close_callback: onCloseCallback,
            modal: self.settings.modal
        });
    };

    var createTarget = function() {
        var node =
        "<div class='playerWrapper'>" +
            "<div id='" + self.settings.target + "'></div>" +
        "</div>";

        self.settings.$targetContainerElement.append(node);
        $(".playerWrapper").css({
            width: "500px",
            height: "350px",
            position: "absolute",
            top: "175px",
            left: "125px"
        });
    };

    if(self.settings.modal == false) {
        playtemEmbedded.Core.createTracker("affiz", "request");
    }

    createTarget();

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            playtemEmbedded.Core.log("Affiz", "script loading error");
            callback("Affiz: script couldn't be loaded", null);
        }
    });
    
    self.timeoutTimer = window.setTimeout(function () {
        onAdAvailable = playtemEmbedded.Core.Operations.noop;
        onAdUnavailable = playtemEmbedded.Core.Operations.noop;
        onVideoComplete = playtemEmbedded.Core.Operations.noop;

        playtemEmbedded.Core.log("Affiz", "timeout");

        callback("Affiz: timeout", null);
    }, self.settings.httpRequestTimeout);
};