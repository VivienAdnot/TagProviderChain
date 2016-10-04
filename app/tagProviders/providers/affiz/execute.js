playtemEmbedded.Affiz.prototype.execute = function(callback) {
    var self = this;

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);
        self.windowBlocker.setBlocker();
        playtemEmbedded.Core.track("affiz", "onAdAvailable", function() {
            callback(null, "success");
        });
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);
        playtemEmbedded.Core.track("affiz", "onAdUnavailable", function() {
            callback("Affiz: no ad", null);
        });
    };

    var onVideoComplete = function() {
        var always = function() {
            playtemEmbedded.Core.track("affiz", "onVideoComplete", function() {
                self.windowBlocker.clearBlocker();
            });
        };

        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey
            });

            rewarder.execute(function(error, success) {
                always();
            });
        } else {
            always();
        }
    };

    var onCloseCallback = function() {
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

    playtemEmbedded.Core.track("affiz", "request");

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

        playtemEmbedded.Core.track("affiz", "timeout", function() {
            callback("Affiz: timeout", null);
        });
    }, self.settings.httpRequestTimeout);
};