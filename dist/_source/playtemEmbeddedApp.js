var playtemEmbedded = {};

playtemEmbedded.App = function(options) {
    var defaults = {
        apiKey: undefined,
        hasReward: false,
        providers: [],
        gameType: undefined,
        outputLanguage: undefined,
        debug: false,
        placementType: undefined
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
        gameType: self.settings.gameType,
        debug: self.settings.debug,
        blockWindow: self.settings.placementType === playtemEmbedded.AppSettings.placementTypes.rewarded
    });
    
    tagProviders.execute();

    var closeBtnWatcher = new playtemEmbedded.CrossManager();
    closeBtnWatcher.watchClose();

    playtemEmbedded.Core.globals.debug = self.settings.debug;
};

playtemEmbedded.AppSettings = {
    placementTypes: {
        outstream: "outstream",
        rewarded: "rewarded"
    }
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
    var url = "//ariane.playtem.com/Browser/Error";
    var logLovel = "error";
    var clientVersion = "JSEmbedded-0.0.1";

    var logPrefix = clientVersion + " : " + (tag ? tag + ": " : "");
    var formattedMessage = logPrefix + message.toString();

    jQuery.post(url, { message: formattedMessage });
};

playtemEmbedded.Core.Operations = {
    onceProxy: function (fn, errorCallback) {
        var returnValue, called, callbackCalled = false;
        errorCallback = errorCallback || function() {};

        return function () {
            if (!called) {
                called = true;
                returnValue = fn.apply(this, arguments);
            } else {
                if(!callbackCalled) {
                    callbackCalled = true;
                    errorCallback();
                }
            }
            return returnValue;
        };
    }
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

playtemEmbedded.Core.track = function(options) {
    var defaults = {
        providerName: undefined,
        apiKey: undefined,
        eventType: undefined,
        onDone: $.noop,
        onFail: $.noop,
        onAlways: $.noop
    };

    var settings = $.extend({}, defaults, options);

    if(!settings.providerName || !settings.apiKey || !settings.eventType) {
        settings.onFail();
        settings.onAlways();
        return;
    }

    var trackerUriBase = (playtemEmbedded.Core.globals.debug === true) ? "//poc.playtem.com/tracker.gif" : "//api.playtem.com/tracker.gif";

    var url = trackerUriBase + "?a=" + settings.eventType
        + "&c=&p=" + settings.providerName
        + "&k=" + settings.apiKey
        + "&t=" + playtemEmbedded.Core.Date.getCurrentTimestamp();

    $.get(url)
        .done(function() {
            settings.onDone();
        })
        .fail(function() {
            playtemEmbedded.Core.log("playtemEmbedded", "pixel tracking fail.");
            settings.onFail();
        })
        .always(function() {
            settings.onAlways();
        });
};

playtemEmbedded.Core.Identifiers = {
    newGUID : function() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

playtemEmbedded.CrossManager = function(options) {
    var defaults = {

    };

    this.settings = {
        $element : $(".js-closeAd"),
        sendEvents: {
            messageCloseWindow : "closeAdWindow"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.CrossManager.prototype = {
    watchClose : function() {
        var self = this;

        self.settings.$element.click(function () {
            window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
        });
    }
};

playtemEmbedded.Reward = function(options) {
    var defaults = {
        apiKey: undefined
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

playtemEmbedded.Reward.prototype.execute = function(callback) {
    var self = this;

    self.init(callback, function(error, data) {
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

playtemEmbedded.Reward.prototype.getReward = function(callback) {
    var self = this;

    var onParseSuccess = function(rewardName, rewardImageUri) {
        //reward img uri
        $("#rewardImageUri").attr("src", rewardImageUri);
        $("#rewardImageUri").css("visibility", "visible");
        //reward img name
        $("#rewardName").text(rewardName);
        $("#rewardName").css("visibility", "visible");
        //our partner
        $(".ad__reward__offerMessage__brandName").text("Our partner");
        //offers you
        $("#js-rewardOfferingMessage").text("offers you");
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

            callback(null, "success");
        } catch(e) {
            var errorMessage = "reward parse response error: " + e;
            playtemEmbedded.Core.log("playtemEmbedded", errorMessage);
            callback(errorMessage, null);
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
            var errorMessage = "reward ajax error: " + errorThrown;
            playtemEmbedded.Core.log("playtemEmbedded", errorMessage);
            callback(errorMessage, null);
        }
    });
};

playtemEmbedded.Reward.prototype.init = function(executeCallback, initCallback) {
    var self = this;

    var hideElements = function() {
        //reward img uri
        $("#rewardImageUri").css("visibility", "hidden");
        //reward img name
        $("#rewardName").css("visibility", "hidden");

        $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
        $("#js-rewardOfferingMessage").css("visibility", "hidden");
    };

    if(!self.settings.apiKey) {
        initCallback("window.apiKey undefined", null);
        return;
    }

    self.executeCallback = executeCallback;

    //hideElements();
    playtemEmbedded.Core.globals.playtemRewardContext = self;

    initCallback(null, "success");
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

    self.getReward(self.executeCallback);
};

playtemEmbedded.TagProviders = function (options) {
    var defaults = {
        providers : [],
        apiKey: undefined,
        gameType: undefined,
        hasReward: false,
        debug: false,
        blockWindow: false
    };

    this.settings = {
        sendEvents: {
            onAdAvailable: "playtem:tagApp:adAvailable",
            onAdUnavailable: "playtem:tagApp:adUnavailable",
            messageCloseWindow: "closeAdWindow"
        }
    };

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.TagProviders.prototype.execute = function () {
    var self = this;

    var placementProfile = (self.settings.blockWindow == true) ? self.getPlacementRewardedBehavior() : self.getPlacementOutstreamBehavior();

    self.fetchAdvert(placementProfile);
};

playtemEmbedded.TagProviders.prototype.fetchAdvert = function (placementProfile) {
    var self = this;
    var index = 0;

    var isArray = function(target) {
        return Object.prototype.toString.call(target) == "[object Array]";
    };

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider({
            debug: self.settings.debug,
            apiKey: self.settings.apiKey,

            onAdAvailable: placementProfile.onAdAvailable,
            onAdComplete: placementProfile.onAdComplete,
            onError: placementProfile.onError,

            onAdUnavailable: function() {
                moveNext();
            }
        });

        provider.execute();
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= self.settings.providers.length) {
            placementProfile.onAllAdUnavailable();
            return;
        }

        var currentProviderReference = self.settings.providers[index];
        executeProvider(currentProviderReference);
    };

    if(!isArray(self.settings.providers || self.settings.providers.length == 0)) {
        playtemEmbedded.Core.log("TagProviders.fetchAdvert", "self.settings.providers is empty or not an array");
        placementProfile.onAllAdUnavailable();
        return;
    }

    run();
};

playtemEmbedded.TagProviders.prototype.getPlacementOutstreamBehavior = function () {
    var self = this;

    return {
        onAdAvailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");

            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey
                });

                rewarder.execute(function(error, success) {
                    // nothing to do
                });
            }
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        },

        onAdComplete : $.noop,

        onError: function() {
            //request close window
            window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
        }
    };
};

playtemEmbedded.TagProviders.prototype.getPlacementRewardedBehavior = function () {
    var self = this;

    var adCompleteOrError = function() {
        var always = function() {
            self.windowBlocker.clearBlocker();
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

    return {
        onAdAvailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
            self.windowBlocker.setBlocker();
        },

        onAllAdUnavailable : function() {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        },

        onAdComplete : adCompleteOrError,

        onError: adCompleteOrError
    };
};

playtemEmbedded.Affiz = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: 'affiz',
        scriptUrl: '//cpm1.affiz.net/tracking/ads_video.php',
        siteId : '315f315f32333439_8d31ea22dd',
        clientId: "12345", // TBD
        $targetContainerElement: $('.ad'),
        modal: true,
        sendEvents: {
            messageCloseWindow : "closeAdWindow"
        }
    };

    playtemEmbedded.Core.globals.affizContext = undefined;

    this.windowBlocker = new playtemEmbedded.WindowBlocker();

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.Affiz.prototype.onAdAvailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.Affiz.prototype.onAdComplete = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};

playtemEmbedded.Affiz.prototype.onAdUnavailable = function() {
    var self = playtemEmbedded.Core.globals.affizContext;
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.Affiz.prototype.onClose = function() {
    var self = playtemEmbedded.Core.globals.affizContext;

    var closeWindow = function() {
        window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdClosed",
        onDone: closeWindow,
        onFail: self.settings.onError,
        onAlways: $.noop
    });
};

playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    window.avAsyncInit = function() {
        var initAffiz = function() {
            AFFIZVIDEO.init({
                site_id: self.settings.siteId,
                clientid: self.settings.clientid,
                modal: self.settings.modal,

                load_callback: self.onAdAvailable,
                noads_callback: self.onAdUnavailable,
                complete_callback: self.onAdComplete,
                close_callback: self.onClose
            });
        }

        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "requestSuccess",
            onDone: initAffiz,
            onFail: self.settings.onAdUnavailable
        });
    };

    self.init();
};

playtemEmbedded.Affiz.prototype.init = function() {
    var self = this;

    playtemEmbedded.Core.globals.affizContext = self;

    var createFakePlayerImage = function() {
        var node = "<img id='playerImg' src='//static.playtem.com/tag/tagProviders/templates/img/player.png' />";

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
            try {
                AFFIZVIDEO.show();
            } catch(e) {

            }
            
            $playerImg.hide();
        });
    };

    createFakePlayerImage();
    
    var injectScript = function() {
        playtemEmbedded.Core.injectScript(self.settings.scriptUrl, $.noop);
    };
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: injectScript,
        onFail: self.settings.onAdUnavailable
    });
};

playtemEmbedded.RevContent = function(options) {
    var defaults = {
        debug : false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop
    };

    this.settings = {
        providerName: 'revContent',
        $targetContainerElement: $('.ad'),
        modal: true,
        httpRequestTimeout: 3000
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.RevContent.prototype.onAdAvailable = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.RevContent.prototype.onAdUnavailable = function() {
    var self = this;

    if(self.adFound === true) {
        self.onAdError();
    }
    
    else {
        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "onAdUnavailable",
            onDone: self.settings.onAdUnavailable,
            onFail: self.settings.onError
        });
    }
};

playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    var initialize = function() {
        self.init(function(status) {
            if(status === false) {
                self.settings.onAdUnavailable();
                return;
            }

            var startWatch = function() {
                self.watchAdCreation(function(adStartedStatus) {
                    if(adStartedStatus === true) {
                        self.onAdAvailable();
                        return;
                    }
                    
                    self.onAdUnavailable();
                });
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: startWatch,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};

playtemEmbedded.RevContent.prototype.init = function(callback) {
    var self = this;

    var createTarget = function(callback) {
        self.settings.$targetContainerElement.append("<div id='revcontent'></div>");
        $("#revcontent").css({
            position: "absolute",
            top: 170,
            left: "0",
            right: "0",
            margin: "auto",
            width: 400,
            "text-align": "center"            
        });
    };

    createTarget();

    self.injectScriptCustom(function(error, result) {
        callback(error);
    });
};

playtemEmbedded.RevContent.prototype.injectScriptCustom = function(callback) {
    var self = this;

    var getReferrer = function() {
        var thisReferrer = "";
        try {
            if (thisReferrer = document.referrer, "undefined" == typeof thisReferrer) throw "undefined";
        } catch (exception) {
            thisReferrer = document.location.href, ("" == thisReferrer || "undefined" == typeof thisReferrer) && (thisReferrer = document.URL)
        }
        thisReferrer = thisReferrer.substr(0, 700);
        return thisReferrer;
    };

    var scriptElement = document.createElement("script");

    scriptElement.id = 'rc_' + Math.floor(Math.random() * 1000);
    scriptElement.type = 'text/javascript';
    scriptElement.src = "//trends.revcontent.com/serve.js.php?"
        + "w=50811"
        + "&t=" + scriptElement.id
        + "&c=" + playtemEmbedded.Core.Date.getCurrentTimestamp()
        + "&width=400"
        + "&referer=" + getReferrer();

    scriptElement.async = true;

    scriptElement.onload = function () {
        callback(true);
    };

    // onload equivalent for IE
    scriptElement.onreadystatechange = function () {
        if (this.readyState === "complete") {
            scriptElement.onload();
        }
    };

    scriptElement.onerror = function () {
        callback(false);
    };

    var revcontentElement = document.getElementById("revcontent");
    revcontentElement.appendChild(scriptElement);
};

playtemEmbedded.RevContent.prototype.watchAdCreation = function(callback) {
    var self = this;
    var timeoutTimer = null;

    var poll = window.setInterval(function() {
        // refresh every round
        var $videoPlayerContainer = $("#revcontent");
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            window.clearTimeout(timeoutTimer);

            window.clearInterval(poll);

            callback(true);
        }
    }, 250);

    timeoutTimer = window.setTimeout(function () {
        window.clearInterval(poll);

        callback(false);
    }, self.settings.httpRequestTimeout);
};

playtemEmbedded.SmartadInternal = function(options) {
    var defaults = {
        apiKey: undefined,
        providerName: undefined,
        formatId : undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop
    };

    this.settings = {
        scriptUrl: '//www8.smartadserver.com/config.js?nwid=1901',
        siteId : 100394,
        pageName : "home",
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

playtemEmbedded.SmartadInternal.prototype.onAdAvailable = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });    
};

playtemEmbedded.SmartadInternal.prototype.onAdUnavailable = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.SmartadInternal.prototype.execute = function(callback) {
    var self = this;

    var onLoadHandler = function(result) {
        if (result && result.hasAd === true) {
            self.onAdAvailable();
        }
        
        else {
            self.onAdUnavailable();
        }
    };

    var initialize = function() {
        self.init(function(error) {
            if(error) {
                self.settings.onAdUnavailable();
                return;
            }
            
            var execute = function() {
                sas.setup({
                    domain: self.settings.domain,
                    async: true,
                    renderMode: 0
                });

                sas.call("onecall",
                    {
                        siteId: self.settings.siteId,
                        pageName: self.settings.pageName,
                        formatId: self.settings.formatId
                    },
                    {
                        onLoad: function(result) {
                            onLoadHandler(result);
                        }
                    }
                );

                self.render();
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: execute,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};

playtemEmbedded.SmartadInternal.prototype.init = function(callback) {
    var self = this;

    var createTarget = function() {
        var node = "<div class='" + self.settings.targetClass + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("." + self.settings.targetClass).css(self.settings.cssProperties);
    };

    createTarget();
    
    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        callback(error);
    });
};

playtemEmbedded.SmartadInternal.prototype.render = function() {
    var self = this;

    var divId = "sas_" + self.settings.formatId;
    $("." + self.settings.targetClass).attr("id", divId);

    sas.render(self.settings.formatId);
};


playtemEmbedded.SmartadMixedContent = function(options) {
    var defaults = {
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop
    };

    this.settings = {
        formatId : 42149
    };

    this.smartadInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SmartadMixedContent.prototype.execute = function() {
    var self = this;

    self.smartadInternal = new playtemEmbedded.SmartadInternal({
        apiKey: self.settings.apiKey,
        formatId: self.settings.formatId,
        providerName: "SmartadMixedContent",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable
    });

    self.smartadInternal.execute();
};

playtemEmbedded.SpotxInternal = function(options) {
    var defaults = {
        debug: false,
        siteId: undefined,
        apiKey: undefined,
        providerName: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        scriptUrl: '//search.spotxchange.com/js/spotx.js',
        scriptOptions: {
            "spotx_channel_id" : options.siteId,
            "spotx_ad_unit" : "incontent",
            "spotx_ad_done_function" : "spotXCallback",
            "spotx_content_width" : "500",
            "spotx_content_height" : "300",
            "spotx_collapse" : "0",
            "spotx_ad_volume" : "1",
            "spotx_unmute_on_mouse" : "0",
            "spotx_autoplay" : "1",
            "spotx_ad_max_duration" : "30",
            "spotx_https" : "1",
            "spotx_content_container_id" : "spotx"
        },
        $targetContainerElement: $('.ad'),

        cssProperties: {
            "position": "absolute",
            "top": "179px",
            "left": "150px",
            "width": "450px",
            "margin": "0 auto",
            "text-align": "center"
        }
    };

    this.executeCallback = undefined;

    this.timeouts = {
        videoAvailability : {
            instance: null,
            duration: 10000
        }
    };

    this.poll = null;
    this.adFound = false;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxInternal.prototype.onAdAvailable = function() {
    var self = this;

    self.adFound = true;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.SpotxInternal.prototype.onAdComplete = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};

playtemEmbedded.SpotxInternal.prototype.onAdUnavailable = function() {
    var self = this;
    
    if(self.adFound === true) {
        self.onError();
    }
    
    else {
        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "onAdUnavailable",
            onDone: self.settings.onAdUnavailable,
            onFail: self.settings.onError
        });
    }
};

playtemEmbedded.SpotxInternal.prototype.onError = function() {
    var self = this;
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdError",
        onAlways: self.settings.onError
    });
};

playtemEmbedded.SpotxInternal.prototype.execute = function(callback) {
    var self = this;

    window.spotXCallback = function(videoStatus) {
        window.clearInterval(self.poll);
        window.clearTimeout(self.timeouts.videoAvailability.instance);

        if(videoStatus === true) {
            self.onAdComplete();
        } else {
            self.onAdUnavailable();
        }
    };

    var initialize = function() {
        self.init(function(error, result) {
            if(error) {
                self.settings.onAdUnavailable();
                return;
            }

            var startWatch = function() {
                self.watchVideoPlayerCreation(function(adStartedStatus) {
                    if(adStartedStatus) {
                        self.onAdAvailable();
                        return;
                    }
                    
                    self.onAdUnavailable();
                });
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: startWatch,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};

playtemEmbedded.SpotxInternal.prototype.init = function(callback) {
    var self = this;

    var createTarget = function(callback) {
        var node =
            "<div class='playerWrapper'>" +
                "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
            "</div>";

        self.settings.$targetContainerElement.append(node);

        $(".playerWrapper").css(self.settings.cssProperties);
    };

    createTarget();

    self.injectScriptCustom(function(error, result) {
        callback(error);
    });
};

playtemEmbedded.SpotxInternal.prototype.injectScriptCustom = function(callback) {
    var self = this;

    var script = document.createElement("script");
    script.async = true;
    script.src = self.settings.scriptUrl;

    for(var key in self.settings.scriptOptions) {
        if(self.settings.scriptOptions.hasOwnProperty(key)) {
            script.setAttribute('data-' + key, self.settings.scriptOptions[key]);
        }
    }

    script.onload = function () {
        callback(null, "success");
    };

    // onload equivalent for IE
    script.onreadystatechange = function () {
        if (this.readyState === "complete") {
            script.onload();
        }
    };

    script.onerror = function () {
        callback("error while loading script", null);
    };

    try {
        document.getElementsByTagName("body")[0].appendChild(script);
    } catch(e) {
        callback("body.appendChild exception: " + e, null);
    }
};

playtemEmbedded.SpotxInternal.prototype.watchVideoPlayerCreation = function(callback) {
    var self = this;

    self.poll = window.setInterval(function() {
        // refresh every round
        var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        if(isVideoPlayerDefined && isVideoPlayerVisible) {
            window.clearTimeout(self.timeouts.videoAvailability.instance);

            window.clearInterval(self.poll);

            callback(true);
        }
    }, 250);

    self.timeouts.videoAvailability.instance = window.setTimeout(function () {
        window.clearInterval(self.poll);

        callback(false);
    }, self.timeouts.videoAvailability.duration);
};

playtemEmbedded.SpotxInstream = function(options) {
    this.siteId = "147520";

    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.spotxInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxInstream.prototype.execute = function() {
    var self = this;

    self.spotxInternal = new playtemEmbedded.SpotxInternal({
        debug: self.settings.debug,
        siteId: self.siteId,
        apiKey: self.settings.apiKey,
        providerName: "SpotxInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError
    });

    self.spotxInternal.execute();
};

playtemEmbedded.SpotxOutstream = function(options) {
    this.siteId = "146222";

    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.spotxInternal = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
};

playtemEmbedded.SpotxOutstream.prototype.execute = function() {
    var self = this;

    self.spotxInternal = new playtemEmbedded.SpotxInternal({
        debug: self.settings.debug,
        siteId: self.siteId,
        apiKey: self.settings.apiKey,
        providerName: "SpotxOutstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onError: self.settings.onError
    });

    self.spotxInternal.execute();
};

playtemEmbedded.PlaytemVastPlayer = function(options) {
    var defaults = {
        debug: false,
        vastTag: undefined,
        apiKey: undefined,
        providerName: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop,

        playerPosition: {
            top: 179,
            width: 500,
            height: 300
        }
    };

    this.settings = {
        playerId: 'radiantVideoPlayer',
        scriptUrl: '//cdn.radiantmediatechs.com/rmp/3.8.3/js/rmp.min.js',

        $targetContainerElement: $('.ad'),
    };

    this.playerPosition =  {
        position: "absolute",
        top: undefined,
        left: "0",
        right: "0",
        margin: "auto",
        width: undefined,
        height: undefined,
        "text-align": "center"
    };

    this.radiantMediaPlayerSettings = {
        adTagUrl: undefined,
        width: undefined,
        height: undefined,        
        licenseKey: undefined,

        ads: true,
        adCountDown: true,
        adUseWatermarkCountdownAndMessage: true,
        delayToFade: 0,
        bitrates: { mp4:[['Start','outstream']] },
        flashFallBack: false,
        autoplay: true,
        
        adOutStream: true,
        hideControls: false,
        hideSeekBar: true,
        hideFullscreen: true,
        hideCentralPlayButton: false
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    this.adFound = false;

    var licenseKeys = {
        "static.playtem.com": 'Kl8lMDc9N3N5MmdjPTY3dmkyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
        "poc.playtem.com": "Kl8lZ2V5MmdjPTY3dmkyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg=="
    };

    this.radiantMediaPlayerSettings.licenseKey = licenseKeys["static.playtem.com"];
    
    this.radiantMediaPlayerSettings.adTagUrl = this.settings.vastTag;
    this.radiantMediaPlayerSettings.width = this.settings.playerPosition.width;
    this.radiantMediaPlayerSettings.height = this.settings.playerPosition.height;

    this.playerPosition.top = this.settings.playerPosition.top + "px";
    this.playerPosition.width = this.settings.playerPosition.width + "px";
    this.playerPosition.height = this.settings.playerPosition.height + "px";
};

playtemEmbedded.PlaytemVastPlayer.prototype.onAdAvailable = function() {
    var self = this;

    self.adFound = true;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdAvailable",
        onDone: self.settings.onAdAvailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.onAdComplete = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdComplete",
        onDone: self.settings.onAdComplete,
        onFail: self.settings.onError
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.onAdUnavailable = function() {
    var self = this;

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdUnavailable",
        onDone: self.settings.onAdUnavailable,
        onFail: self.settings.onError
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.onError = function() {
    var self = this;

    self.clean();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "onAdError",
        onAlways: self.settings.onError
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.clean = function() {
    var self = this;
    
    $("#" + self.settings.playerId).remove();
}

playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    self.init(function(error) {
        if(error) {
            self.settings.onAdUnavailable();
            return;
        }
        
        if(typeof RadiantMP == "undefined") {
            self.settings.onAdUnavailable();
            return;
        }
        
        var videoPlayer = new RadiantMP(self.settings.playerId);
        var videoPlayerElement = document.getElementById(self.settings.playerId);
        
        if(!videoPlayer || typeof videoPlayer.init !== "function") {
            self.settings.onAdUnavailable();
            return;
        }

        var runPlayer = function() {
            videoPlayerElement.addEventListener('adstarted', function() {
                self.onAdAvailable();
            });

            videoPlayerElement.addEventListener('aderror', function() {
                console.log(videoPlayer.getAdErrorCode());
                (self.adFound == true) ? self.onError() : self.onAdUnavailable();
            });

            videoPlayerElement.addEventListener('adcomplete', function() {
                self.onAdComplete();
            });

            videoPlayerElement.addEventListener('adskipped', function() {
                self.onAdComplete();
            });
            
            videoPlayer.init(self.radiantMediaPlayerSettings);
        };

        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  self.settings.apiKey,
            eventType: "requestSuccess",
            onDone: runPlayer,
            onFail: self.settings.onAdUnavailable
        });
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.init = function(callback) {
    var self = this;

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.playerPosition);
    };

    createTarget();

    var injectScript = function() {
        playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
            callback(error);
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: injectScript,
        onFail: self.settings.onAdUnavailable
    });
};

playtemEmbedded.PlaytemVastInstream = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onAdError: $.noop
    };

    this.settings = {

    };

    this.vastPlayer = undefined;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        // nothing to do
    }
};

playtemEmbedded.PlaytemVastInstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        


        //return "//static.playtem.com/tag/tagProviders/vast/rewarded/playtem-vast-wrapper-instream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
        return "../vast/rewarded/playtem-vast-wrapper-instream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};

playtemEmbedded.PlaytemVastOutstream = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onAdError: $.noop
    };

    this.settings = {

    };

    this.vastPlayer = undefined;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);

    if(this.settings.debug === true) {
        // nothing to do
    }
};

playtemEmbedded.PlaytemVastOutstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/outstream/playtem-vast-wrapper-outstream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastOutstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};

playtemEmbedded.WindowBlocker = function(options) {
    var defaults = {

    };

    this.settings = {
        $blockableElement : $(".js-closeAd"),
        fadeInDuration: 500
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
        self.settings.$blockableElement.fadeIn(self.settings.fadeInDuration);
    }
};