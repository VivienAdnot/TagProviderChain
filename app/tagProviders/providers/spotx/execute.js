playtemEmbedded.Spotx.prototype.execute = function(callback) {
    var self = this;

    var onScriptLoaded = function() {
        self.settings.debug && console.log("onScriptLoaded");
        playtemEmbedded.Core.createTracker("spotx", "request");
        detectOnAdStarted();
    };

    var onScriptInjectionError = function(errorMessage) {
        window.clearTimeout(self.timeouts.scriptInjected.instance);
        callback("Spotx exception: " + errorMessage, null);
    };

    //custom
    var detectOnAdStarted = function() {
        var onAdAvailableCalled = false;
        var $playerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);

        if($playerContainer.length != 1) {
            callback("Spotx exception: player container is undefined", null);
        }

        self.timeouts.videoAvailability.instance = window.setTimeout(function () {
            window.clearInterval(poll);
            self.settings.debug && console.log("timeout: player visible");
            callback("Spotx timeout: video availability", null);
            return;
        }, self.timeouts.videoAvailability.duration);

        var poll = window.setInterval(function() {
            var isPlayerVisible = $playerContainer.height() > 0;

            if(isPlayerVisible) {
                window.clearInterval(poll);
                window.clearTimeout(self.timeouts.videoAvailability.instance);
                self.settings.debug && console.log("player visible");

                //todo onceProxy;
                if(onAdAvailableCalled == false) {
                    onAdAvailableCalled = true;
                    onAdAvailable();
                }
            }
            
        }, 200);
    };

    //custom
    // todo don't name it here, do it in settings and do window[settings_method_name] = function()
    window.spotXCallback = function(videoStatus) {
        if (typeof videoStatus != "boolean") {
            callback("Spotx exception: spotXCallback bad parameter videoStatus: " + videoStatus, null);
            return;
        }

        if(videoStatus === true) {
            self.settings.debug && console.log("spotXCallback: video completion");
            onVideoComplete();
        } else {
            self.settings.debug && console.log("spotXCallback: onAdUnavailable");
            onAdUnavailable();
        }
    };

    var onAdAvailable = function() {
        self.timeouts.videoCompletion.instance = window.setTimeout(function () {
            self.windowBlocker.clearBlocker();
            self.settings.debug && console.log("timeout: video completion");
            playtemEmbedded.Core.log("spotx", "Spotx timeout: video completion");
        }, self.timeouts.videoCompletion.duration);

        playtemEmbedded.Core.createTracker("spotx", "onAdAvailable");

        self.windowBlocker.setBlocker();
        self.settings.debug && console.log("onAdAvailable");
        callback(null, "success");
    };

    var onAdUnavailable = function() {
        window.clearTimeout(self.timeouts.videoAvailability.instance);
        playtemEmbedded.Core.createTracker("spotx", "onAdUnavailable");

        self.settings.debug && console.log("onAdUnavailable");
        callback("Spotx: no ad", null);
    };

    var onVideoComplete = function() {
        window.clearTimeout(self.timeouts.videoCompletion.instance);
        playtemEmbedded.Core.createTracker("spotx", "onVideoComplete");

        self.windowBlocker.clearBlocker();
        self.settings.debug && console.log("onVideoComplete");
    };

    var createTarget = function() {
        var node = "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>";
        self.settings.$targetContainerElement.append(node);
    };

    createTarget();

    // inject script
    try {
        var script = document.createElement("script");
        script.async = true;
        script.src = self.settings.scriptUrl;

        var toDashed = function(name) {
            return name.replace(/([A-Z])/g, function(u) {
                return "-" + u.toLowerCase();
            });
        };        

        for(var key in self.settings.scriptOptions) {
            if(self.settings.scriptOptions.hasOwnProperty(key)) {
                script.setAttribute('data-' + toDashed(key), self.settings.scriptOptions[key]);
            }
        }

        script.onerror = function () {
            onScriptInjectionError(e);
            window.clearTimeout(self.timeouts.scriptInjected.instance);
            throw "Spotx exception: inject script error";
        };

        script.onload = function () {
            window.clearTimeout(self.timeouts.scriptInjected.instance);
            onScriptLoaded();
        };

        // onload equivalent for IE
        script.onreadystatechange = function () {
            if (this.readyState === "complete") {
                script.onload();
            }
        };

        self.timeouts.scriptInjected.instance = window.setTimeout(function () {
            callback("Spotx timeout: script injection", null);
            return;
        }, self.timeouts.scriptInjected.duration);

        document.getElementsByTagName("body")[0].appendChild(script);
    } catch(e) {
        onScriptInjectionError(e);
        return;
    }
};