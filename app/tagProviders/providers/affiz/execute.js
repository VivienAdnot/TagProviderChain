playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    var closeWindow = function() {
        window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
    };

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);

        playtemEmbedded.Core.track("affiz", "onAdAvailable", function() {
            self.settings.onAdAvailable();
        });
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);

        playtemEmbedded.Core.track("affiz", "onAdUnavailable", function() {
            self.settings.onAdAvailable();
        });
    };

    var onVideoComplete = function() {
        playtemEmbedded.Core.track("affiz", "onVideoComplete", function() {
            self.settings.onAdComplete();
        });
    };

    var onClose = function() {
        playtemEmbedded.Core.track("affiz", "onVideoClosed", function() {
            closeWindow();
        });
    };

    window.avAsyncInit = function() {
        AFFIZVIDEO.init({
            site_id: self.settings.siteId,
            clientid: "12345", // todo set
            load_callback: onAdAvailable,
            noads_callback: onAdUnavailable,
            complete_callback: onVideoComplete,
            close_callback: onClose,
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

    playtemEmbedded.Core.track("affiz", "request");

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            playtemEmbedded.Core.log("Affiz", "script loading error");
            callback("Affiz: script couldn't be loaded", null);
        }
    });
    
    self.timeoutTimer = window.setTimeout(function () {
        onAdAvailable = $.noop;
        onAdUnavailable = $.noop;
        onVideoComplete = $.noop;

        playtemEmbedded.Core.track("affiz", "timeout", function() {
            self.settings.onError("Affiz: timeout");
        });
    }, self.settings.httpRequestTimeout);
};