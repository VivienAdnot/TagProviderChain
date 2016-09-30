playtemEmbedded.Affiz.prototype.execute = function(callback) {
    var self = this;

    var closeWindow = function() {
        window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
    }

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);
        self.windowBlocker.setBlocker();
        playtemEmbedded.Core.createTracker("affiz", "onAdAvailable");

        callback(null, "success");
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);
        playtemEmbedded.Core.createTracker("affiz", "onAdUnavailable");
        callback("Affiz: no ad", null);
    };

    var onVideoComplete = function() {
        playtemEmbedded.Core.createTracker("affiz", "onVideoComplete");
        closeWindow();
    };

    var onCloseCallback = function() {
        playtemEmbedded.Core.createTracker("affiz", "onVideoClosed");
        closeWindow();
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

    var createFakePlayerImage = function() {
        var node = "<img id='playerImg' src='//static.playtem.com/tag/tagProviders/img/player.png' />";

        $("body").append(node);

        var $playerImg = $("#playerImg");

        $playerImg.css({
            position: "absolute",
            top: "190px",
            left: "0",
            right: "0",
            margin: "auto",
            width: "500px",
            height: "300px",
            cursor: "pointer"
        });

        $playerImg.one("click", function() {
            AFFIZVIDEO.show();
            $playerImg.hide();
        });
    };

    createFakePlayerImage();

    playtemEmbedded.Core.createTracker("affiz", "request");

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