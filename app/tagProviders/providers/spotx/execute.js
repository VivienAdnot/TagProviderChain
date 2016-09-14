playtemEmbedded.Spotx.prototype.execute = function(callback) {
    var self = this;
    
    var onAdAvailableCalled = false;
    var onAdUnavailableCalled = false;
    var onVideoCompleteCalled = false;

    //custom
    var detectOnAdStarted = function() {
        self.poll = window.setInterval(function() {
            // refresh every round
            var $playerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
            var isPlayerDefined = $playerContainer.length == 1;
            var isPlayerVisible = $playerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

            if(isPlayerDefined && isPlayerVisible) {
                window.clearInterval(self.poll);
                window.clearTimeout(self.timeouts.videoAvailability.instance);

                //todo onceProxy;
                if(onAdAvailableCalled == false) {
                    onAdAvailableCalled = true;
                    onAdAvailable();
                } else {
                    playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
                }
            }
            
        }, 200);

        self.timeouts.videoAvailability.instance = window.setTimeout(function () {
            window.clearInterval(self.poll);

            if(onAdUnavailableCalled == false) {
                onAdUnavailable();
                onAdUnavailableCalled = true;

                playtemEmbedded.Core.log("spotx", "detectOnAdStarted timeout");
            } else {
                playtemEmbedded.Core.log("spotx", "attempted to call onAdUnavailable more than once");
            }
        }, self.timeouts.videoAvailability.duration);        
    };

    //custom
    // todo don't name it here, do it in settings and do window[settings_method_name] = function()
    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        if (typeof videoStatus != "boolean") {
            callback("Spotx exception: spotXCallback bad parameter videoStatus: " + videoStatus, null);
            return;
        }

        if(videoStatus === true) {
            self.settings.debug && console.log("spotXCallback: video completion");

            if(onVideoCompleteCalled == false) {
                onVideoComplete();
                onVideoCompleteCalled = true;
            } else {
                // do not log, allowedbehaviour if the player pauses the player
            }
            
        } else {
            self.settings.debug && console.log("spotXCallback: onAdUnavailable");

            if(onAdUnavailableCalled == false) {
                onAdUnavailable();
                onAdUnavailableCalled = true;
            } else {
                playtemEmbedded.Core.log("spotx", "attempted to call onAdUnavailable more than once");
            }
        }
    };

    var onAdAvailable = function() {
        onAdUnavailable = playtemEmbedded.Core.Operations.noop;

        playtemEmbedded.Core.createTracker("spotx", "onAdAvailable");

        self.windowBlocker.setBlocker();

        self.timeouts.videoCompletion.instance = window.setTimeout(function () {
            onVideoComplete();
        }, self.timeouts.videoCompletion.duration);

        self.settings.debug && console.log("onAdAvailable");
        callback(null, "success");
    };

    var onAdUnavailable = function() {
        playtemEmbedded.Core.createTracker("spotx", "onAdUnavailable");

        onAdAvailable = playtemEmbedded.Core.Operations.noop;

        self.settings.debug && console.log("onAdUnavailable");
        callback("Spotx: no ad", null);
    };

    var onVideoComplete = function() {
        window.clearTimeout(self.timeouts.videoCompletion.instance);

        self.windowBlocker.clearBlocker();

        playtemEmbedded.Core.createTracker("spotx", "onVideoComplete");
        self.settings.debug && console.log("onVideoComplete");
    };

    var createTarget = function() {
        var node =
        "<div class='playerWrapper'>" +
            "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
        "</div>";

        self.settings.$targetContainerElement.append(node);

        $(".playerWrapper").css(self.settings.cssProperties);
    };

    createTarget();

    // inject script

    var injectScript = function() {
        var onScriptLoaded = function() {
            self.settings.debug && console.log("onScriptLoaded");
            playtemEmbedded.Core.createTracker("spotx", "request");
            detectOnAdStarted();
        };

        var onScriptInjectionError = function(errorMessage) {
            callback("Spotx exception onScriptInjectionError: " + errorMessage, null);
        };
        
        var script = document.createElement("script");
        script.async = true;
        script.src = self.settings.scriptUrl;

        for(var key in self.settings.scriptOptions) {
            if(self.settings.scriptOptions.hasOwnProperty(key)) {
                script.setAttribute('data-' + key, self.settings.scriptOptions[key]);
            }
        }

        script.onload = function () {
            onScriptLoaded();
        };

        // onload equivalent for IE
        script.onreadystatechange = function () {
            if (this.readyState === "complete") {
                script.onload();
            }
        };

        script.onerror = function () {
            onScriptInjectionError("error while loading script");
        };

        try {
            document.getElementsByTagName("body")[0].appendChild(script);
        } catch(e) {
            onScriptInjectionError("body.appendChild exception: " + e);
            return;
        }
    }

    injectScript();
};