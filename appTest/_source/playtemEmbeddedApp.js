var playtemEmbedded = {};

playtemEmbedded.App = function(options) {
    var defaults = {
        /*mandatory*/
        apiKey: undefined,
        hasReward: false,
        providers: [],
        gameType: undefined,
        /* mandatory */
        outputLanguage: undefined
    };

    this.settings = {

    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.App.prototype.execute = function() {
    var self = this;

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers,
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType        
    });
    
    tagProviders.execute(playtemEmbedded.Core.Operations.noop);
};

playtemEmbedded.Core = {};

playtemEmbedded.Core.Date = {
    getCurrentTimestamp : function() {
        return $.now();
    },

    getUnixCurrentTimestampSeconds : function() {
        var referenceDate = new Date();

        var getUTCTimestampSeconds = function() {
            var utcTimestampMilliseconds = referenceDate.getTime();
            return Math.floor(utcTimestampMilliseconds  / 1000);
        };

        return getUTCTimestampSeconds();
    }
};

playtemEmbedded.Core.globals = {};

playtemEmbedded.Core.injectScript = function(url, callback) {
    $.getScript(url, callback);
};

playtemEmbedded.Core.log = function (tag, message) {
    var url = "http://ariane.playtem.com/Browser/Error";
    var logLovel = "error";
    var clientVersion = "JSEmbedded-0.0.1";

    var logPrefix = clientVersion + " : " + (tag ? tag + ": " : "");
    var formattedMessage = logPrefix + message.toString();

    jQuery.post(url, { message: formattedMessage });
};

playtemEmbedded.Core.Operations = {
    noop: function () {}
};

playtemEmbedded.Core.PostMessage = function() {
    this.listenerPool = {};
};

playtemEmbedded.Core.PostMessage.prototype.listen = function(eventHandler) {
    var self = this;

    window.addEventListener("message", responseHandler, false);
    var poolLength = self.listenerPool.push(responseHandler);
    var listenerId = poolLength - 1;
    return listenerId;
};

playtemEmbedded.Core.PostMessage.prototype.send = function(message) {
    window.parent.postMessage(message, "*");
};

playtemEmbedded.Core.PostMessage.prototype.destroyListener = function(listenerId) {
    var self = this;

    var handler = self.listenerPool.splice(listenerId);
    window.removeEventListener("message", handler, false);
};

playtemEmbedded.Core.createTracker = function(providerName, eventType) {
    var buildUrl = function() {
        var timestamp = playtemEmbedded.Core.Date.getCurrentTimestamp();
        return "https://api.playtem.com/tracker.gif?a=" + eventType + "&c=&p=" + providerName + "&t=" + timestamp;
    };

    var pixel = document.createElement("img");
    pixel.src = buildUrl();
    pixel.className = "u-tracker";
    pixel.width = "0";
    pixel.height = "0";
    pixel.setAttribute("style", "position:absolute; visibility:hidden;");
    
    var script = document.getElementsByTagName('script')[0];
    var body = script.parentNode;
    var node = body.insertBefore(pixel, script);
};

playtemEmbedded.Core.Identifiers = {
    newGUID : function() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        providers : [],
        apiKey: undefined,
        gameType: undefined,
        hasReward: false        
    };

    this.settings = {
        sendEvents: {
            onAdAvailable: "playtem:tagApp:adAvailable",
            onAdUnavailable: "playtem:tagApp:adUnavailable"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.TagProviders.prototype.execute = function (callback) {
    var self = this;

    self.fetchAdvert(function (error, result) {
        if(result == "success") {
            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey,
                    gameType: self.settings.gameType
                });

                rewarder.run();
            }

            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
        } else {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        }

        if(typeof callback == "function") {
            callback(error, result);
        }
    });
};

playtemEmbedded.TagProviders.prototype.fetchAdvert = function (callback) {
    /*var self = this;
    var index = 0;

    var isArray = function(target) {
        return Object.prototype.toString.call(target) == "[object Array]";
    };

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider();

        provider.execute(function (error, result) {
            if (error !== null) {
                console.log("execute provider result error: " + error);
                moveNext();
                return;
            }

            callback(error, result);
        });
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= self.settings.providers.length) {
            callback("no more provider to call", null);
            return;
        }

        var currentProviderReference = self.settings.providers[index];
        executeProvider(currentProviderReference);
    };

    if(!isArray(self.settings.providers)) {
        callback("self.settings.providers must be an array", null);
        return;
    }

    run();*/

    var provider = new playtemEmbedded.Spotx({
        debug: true
    });

    provider.execute(function (error, result) {
        if(error) {
            playtemEmbedded.Core.log("spotx", error);
        }

        callback(error, result);
    });
};

playtemEmbedded.Affiz = function(options) {
    var defaults = {
    };

    this.settings = {
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : '315f315f393336_d465200f9f', // todo replace,
        target: 'iframeAdsAffiz',
        $targetContainerElement: $('.ad'),
        httpRequestTimeout: 5000
    };

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.timeoutTimer = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

playtemEmbedded.Affiz.prototype.destructor = function(callback) {
    var self = this;

    window.avAsyncInit = undefined;
    window.clearTimeout(self.timeoutTimer);
};

playtemEmbedded.Affiz.prototype.execute = function(callback) {
    var self = this;

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);
        self.windowBlocker.setBlocker();
        callback(null, "success");
        AFFIZVIDEO.show();
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);
        callback("Affiz: no ad", null);
    };

    var onVideoComplete = function() {
        self.windowBlocker.clearBlocker();
    };

    window.avAsyncInit = function() {
        AFFIZVIDEO.init({
            site_id: '315f315f393336_d465200f9f', // todo set
            clientid: "0000", // todo set
            load_callback: onAdAvailable,
            noads_callback: onAdUnavailable,
            complete_callback: onVideoComplete,
            modal: false
        });
    };

    self.timeoutTimer = window.setTimeout(function () { // todo attach self
        self.destructor();
        onAdAvailable = playtemEmbedded.Core.Operations.noop; // todo test
        onAdUnavailable = playtemEmbedded.Core.Operations.noop;
        onVideoComplete = playtemEmbedded.Core.Operations.noop;

        callback("Affiz: timeout", null);
    }, self.settings.httpRequestTimeout);

    var createTarget = function() {
        var node =
        "<div class='playerWrapper'>" +
            "<div id='" + self.settings.target + "'></div>" +
        "</div>";

        self.settings.$targetContainerElement.append(node);
        $(".playerWrapper").css({
            width: "500px",
            height: "350px"
        });
    };

    createTarget();

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            callback("Affiz: script couldn't be loaded", null);
            self.destructor();
        }
    });    
};

playtemEmbedded.Smartad = function(options) {
    var defaults = {
    };

    this.settings = {
        scriptUrl: '//www8.smartadserver.com/config.js?nwid=1901',
        siteId : 100394,
        pageName : "home",
        formatId : 42149,
        domain: '//www8.smartadserver.com',

        targetClass: 'smartad',
        $targetContainerElement: $('.ad'),
        httpRequestTimeout: 5000,

        cssProperties: {
            "position": "absolute",
            "top": "179px",
            "left": "125px",
            "width": "500px",
            "margin": "0 auto",
            "text-align": "center"
        }
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

playtemEmbedded.Smartad.prototype.destructor = function() {
    var self = this;
    if($(self.settings.targetClass).length > 0) {
        $(self.settings.targetClass).remove();
    }
};

playtemEmbedded.Smartad.prototype.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        if(self.timeoutFired == true) {
            // callback has already been fired.
            return;
        }
        
        if(error != null) {
            callback("smartad: script injection error", null)
            return;
        }

        sas.setup({
            domain: self.settings.domain,
            async: true,
            renderMode: 0
        });

        var loadHandler = function(result) {
            if (result && result.hasAd === true) {
                callback(null, "success");
                return;
            } else {
                self.destructor();
                callback("no ad", null);
                return;
            }
        };

        sas.call("onecall",
            {
                siteId: self.settings.siteId,
                pageName: self.settings.pageName,
                formatId: self.settings.formatId
            },
            {
                onLoad: function(result) {
                    if(self.timeoutFired) {
                        return;
                    }

                    window.clearTimeout(self.timeoutTimer);
                    loadHandler(result);
                }
            }
        );

        // we have to call it outside of the callback
        self.render();
    });

    self.timeoutTimer = window.setTimeout(function () {
        self.destructor();
        self.timeoutFired = true;
        callback("Smartad: timeout", null);
    }, self.settings.httpRequestTimeout);
};

playtemEmbedded.Smartad.prototype.init = function(callback) {
    var self = this;

    var createTarget = function() {
        var node = "<div class='" + self.settings.targetClass + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("." + self.settings.targetClass).css(self.settings.cssProperties);
    };

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(!error && data == "success") {
            createTarget();
            callback(null, "success");
            return;
        }
        
        callback("smartad: script couldn't be loaded", null);
    });
};

playtemEmbedded.Smartad.prototype.render = function() {
    var self = this;

    var divId = "sas_" + self.settings.formatId;
    $("." + self.settings.targetClass).attr("id", divId);

    sas.render(self.settings.formatId);
};


playtemEmbedded.Spotx = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: '//search.spotxchange.com/js/spotx.js',
        scriptOptions: {
            "spotx_channel_id" : "85394",
            "spotx_ad_unit" : "incontent",
            "spotx_ad_done_function" : "spotXCallback",
            "spotx_content_width" : "450",
            "spotx_content_height" : "370",
            "spotx_collapse" : "1",
            "spotx_ad_volume" : "0",
            "spotx_unmute_on_mouse" : "1",
            "spotx_autoplay" : "1",
            "spotx_ad_max_duration" : "500",
            "spotx_https" : "1",
            "spotx_content_container_id" : "spotx"
        },
        $targetContainerElement: $('.ad'),
    };

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.timeouts = {
        scriptInjected : {
            instance: null,
            duration: 1000
        },
        videoAvailability : {
            instance: null,
            duration: 4000
        },
        videoCompletion : {
            instance: null,
            duration: 30000
        }
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

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

playtemEmbedded.Reward = function(options) {
    var defaults = {
        apiKey: undefined,
        gameType: undefined
    };

    this.settings = {
        scriptUrl: "//api.playtem.com/advertising/services.reward/",
        sendEvents: {
            userId: "playtem:tagApp:userId",
        }
    };

    this.userId = null;
    this.executeCallback = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

playtemEmbedded.Reward.prototype.getReward = function(callback) {
    var self = this;

    var onParseSuccess = function(rewardName, rewardImageUri) {
        if(self.settings.gameType == "desktop") {
            //reward img uri
            $("#rewardImageUri").attr("src", rewardImageUri);
            $("#rewardImageUri").css("visibility", "visible");
            //reward img name
            $("#rewardName").text(rewardName);
            $("#rewardName").css("visibility", "visible");
            //our partner
            $(".ad__reward__offerMessage__brandName").css("visibility", "visible");
            //offers you
            $("#js-rewardOfferingMessage").css("visibility", "visible");
        } else if(self.settings.gameType == "mobile") {
            //reward img ui
            $(".ad__reward__image").attr("src", rewardImageUri);
            $(".ad__reward__image").css("visibility", "visible");
            //reward name
            $(".ad__reward__offerMessage__rewardName").text(rewardName);
            $(".ad__reward__offerMessage__rewardName").css("visibility", "visible");
            //our partner
            $(".ad__header__title").css("visibility", "visible");
            //offers you
            $("#js-rewardOfferingMessage").css("visibility", "visible");
        } else {
            // todo handle error
            return;
        }
    };

    var parseResponse = function(data) {
        try {
            if(data.StatusCode !== 0) {
                throw "no gift available: " + data.StatusCode + ", " + data.StatusMessage;
            }

            var response = data.Response;

            var rewardImageUri = response.Image;
            if(!rewardImageUri) {
                throw "no reward image";
            }

            var defaultLanguage = response.Name.Default;
            if(!defaultLanguage) {
                throw "no default Language";
            }

            var rewardName = response.Name[defaultLanguage];
            if(!rewardName) {
                throw "no reward Name";
            }

            onParseSuccess(rewardName, rewardImageUri);

            callback(null, "parseResponse success");
        } catch(e) {
            playtemEmbedded.Core.log("Smartad template : ajax success", e);
            callback("parseResponse error: " + e, null);
        }
    };

    $.ajax({
        url: self.settings.scriptUrl,
        data: {
            apiKey : self.settings.apiKey,
            userId : self.userId,
            timestamp : playtemEmbedded.Core.Date.getUnixCurrentTimestampSeconds()
        },
        success: parseResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            playtemEmbedded.Core.log("Smartad template : ajax error", errorThrown);
        }
    });
};

playtemEmbedded.Reward.prototype.init = function(callback) {
    var self = this;

    var hideElements = function() {
        if(self.settings.gameType == "desktop") {
            //reward img uri
            $("#rewardImageUri").css("visibility", "hidden");
            //reward img name
            $("#rewardName").css("visibility", "hidden");

            $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
            $("#js-rewardOfferingMessage").css("visibility", "hidden");

        } else if(self.settings.gameType == "mobile") {
            //reward img uri
            $(".ad__reward__image").css("visibility", "hidden");
            $(".ad__reward__offerMessage__rewardName").css("visibility", "hidden");
            $(".ad__header__title").css("visibility", "hidden");
            $("#js-rewardOfferingMessage").css("visibility", "hidden");

        } else {
            // todo handle error
            return;
        }
    }

    if(!self.settings.apiKey) {
        callback("window.apiKey undefined", null);
        return;        
    }

    hideElements();
    playtemEmbedded.Core.globals.playtemRewardContext = self;

    callback(null, "success");
};

playtemEmbedded.Reward.prototype.run = function() {
    var self = this;

    self.init(function(error, data) {
        if(error != null) {
            return;
        }

        // listen
        window.addEventListener("message", self.userIdMessageHandler, false);

        // send
        window.parent.postMessage(self.settings.sendEvents.userId, "*");

        // we don't set up a timeout because this module is not critical for the app if it fails.
        // create a default reward in the html template in case of error
    });
};

playtemEmbedded.Reward.prototype.userIdMessageHandler = function(postMessage) {
    var self = playtemEmbedded.Core.globals.playtemRewardContext;
    var playtemIdentifier = "playtem:js:";

    if(!postMessage || !postMessage.data) {
        return;
    }

    var userIdMessage = postMessage.data;

    if(userIdMessage.indexOf(playtemIdentifier) != 0) {
        return;
    }

    var extractUserId = function() {
        return userIdMessage.substring(playtemIdentifier.length);
    };

    self.userId = extractUserId();

    self.getReward(playtemEmbedded.Core.Operations.noop);
};

playtemEmbedded.WindowBlocker = function(options) {
    var defaults = {

    };

    this.settings = {
        $blockableElement : $(".js-closeAd"),
        crossFadeInDuration: 800
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.WindowBlocker.prototype = {
    setBlocker : function() {
        var self = this;
        self.settings.$blockableElement.hide();
    },

    clearBlocker: function() {
        var self = this;
        self.settings.$blockableElement.fadeIn(self.settings.crossFadeInDuration);
    }
};