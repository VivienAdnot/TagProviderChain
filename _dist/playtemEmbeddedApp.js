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
    var deferred = $.Deferred();

    if(!url) {
        deferred.reject();
        return deferred.promise();
    }

    $.getScript(url, function(error, data) {
        if(error) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
    });

    window.setTimeout(deferred.reject, 2000);

    return deferred.promise();
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

playtemEmbedded.Core.track = function(providerName, apiKey, eventType) {
    var deferred = $.Deferred();

    if(!providerName || !apiKey || !eventType) {
        deferred.reject();
        return deferred.promise();
    }

    var url = "//api.playtem.com/tracker.gif?a=" + eventType
        + "&c=&p=" + providerName
        + "&k=" + apiKey
        + "&t=" + playtemEmbedded.Core.Date.getCurrentTimestamp();

    $.get(url)
    .done(deferred.resolve)
    .fail(deferred.reject);

    return deferred.promise();
};

playtemEmbedded.Core.Identifiers = {
    newGUID : function() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

playtemEmbedded.Core.watch = function(condition, interval, timeout) {
    var deferred = $.Deferred();

    if(typeof condition !== "function") {
        deferred.reject();
        return deferred.promise();
    }

    interval = interval || 250;
    timeout = timeout || 3000;

    var poll = window.setInterval(function() {
        if(condition()) {
            deferred.resolve();
            window.clearInterval(poll);
        }
    }, timeout);

    window.setTimeout(function () {
        deferred.reject();
        window.clearInterval(poll);
    }, timeout);

    return deferred.promise();
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

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};

playtemEmbedded.Reward.prototype.execute = function() {
    var self = this;
    var deferred = $.Deferred();

    if(!self.settings.apiKey) {
        deferred.reject();
    }

    else {
        self.UIHideElements()
        .then(function() {
            self.requestUserId()
            .fail(function() {
                deferred.reject("request user id failed");
            })
            .done(function(playtemUserId) {
                self.getReward(playtemUserId)
                .fail(function(errorMessage) {
                    deferred.reject(errorMessage);
                })
                .done(function(result) {
                    self.UIShowElements(result.name, result.imageUri)
                    .then(deferred.resolve);
                })
            });
        })
    }

    return deferred.promise();
};

playtemEmbedded.Reward.prototype.getReward = function(playtemUserId) {
    var self = this;
    var deferred = $.Deferred();

    $.get(self.settings.scriptUrl, {
        apiKey : self.settings.apiKey,
        userId : playtemUserId,
        timestamp : playtemEmbedded.Core.Date.getUnixCurrentTimestampSeconds()
    })
    .fail(function() {
        deferred.reject("playtem ajax call failed");
    })
    .done(function(data) {
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

            deferred.resolve({
                name: rewardName,
                imageUri: rewardImageUri
            });
        } catch(e) {
            deferred.reject("reward parse response error: " + e);
        }
    });

    return deferred.promise();
};

playtemEmbedded.Reward.prototype.requestUserId = function() {
    var self = this;
    var deferred = $.Deferred();

    var extractUserId = function(postMessage) {
        var playtemIdentifier = "playtem:js:";

        //drop this message and wait for the next one
        if(!postMessage || !postMessage.data) {
            return;
        }

        var userIdMessage = postMessage.data;

        //drop this message and wait for the next one
        if(userIdMessage.indexOf(playtemIdentifier) != 0) {
            return;
        }

        var extractUserId = function() {
            return userIdMessage.substring(playtemIdentifier.length);
        };

        deferred.resolve(extractUserId());
    };

    // listen
    window.addEventListener("message", extractUserId, false);

    // send
    window.parent.postMessage(self.settings.sendEvents.userId, "*");

    window.setTimeout(deferred.reject, 2000);

    return deferred.promise();
};

playtemEmbedded.Reward.prototype.UIHideElements = function() {
    var deferred = $.Deferred();

    var hideElements = function() {
        //reward img uri
        $("#rewardImageUri").css("visibility", "hidden");
        //reward img name
        $("#rewardName").css("visibility", "hidden");

        $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
        $("#js-rewardOfferingMessage").css("visibility", "hidden");
    };

    deferred.resolve(hideElements());

    return deferred.promise();
};

playtemEmbedded.Reward.prototype.UIShowElements = function(name, imageUri) {
    var deferred = $.Deferred();

    var showElements = function() {
        //reward img uri
        $("#rewardImageUri").attr("src", imageUri);
        $("#rewardImageUri").css("visibility", "visible");
        //reward img name
        $("#rewardName").text(name);
        $("#rewardName").css("visibility", "visible");
        //our partner
        $(".ad__reward__offerMessage__brandName").text("Our partner");
        $(".ad__reward__offerMessage__brandName").css("visibility", "visible");
        //offers you
        $("#js-rewardOfferingMessage").text("offers you");
        $("#js-rewardOfferingMessage").css("visibility", "visible");
    };

    deferred.resolve(showElements());

    return deferred.promise();
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

                rewarder.execute()
                .fail(function(error) {
                    playtemEmbedded.Core.log("reward", error);
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
        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey
            });

            rewarder.execute()
            .fail(function(error) {
                playtemEmbedded.Core.log("reward", error);
            })
            .always(function() {
                self.windowBlocker.clearBlocker();
            });
        } else {
            self.windowBlocker.clearBlocker();
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
    var siteIdProduction = '315f315f32333439_8d31ea22dd';
    var siteIdTest = '315f315f32333530_68dafd7974';

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
        siteId : siteIdProduction,
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

    if(this.settings.debug === true) {
        this.settings.siteId = siteIdTest;
    }
};

playtemEmbedded.Affiz.prototype.execute = function() {
    var self = this;

    self.init()
        .fail(self.settings.onAdUnavailable)
        .done(function() {
            var watcherPromises = self.watcher();

            watcherPromises.isAdAvailable
            .done(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
                .done(self.settings.onAdAvailable)
                .fail(self.settings.onError);
            })
            .fail(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
                .done(self.settings.onAdUnavailable)
                .fail(self.settings.onError);
            });

            watcherPromises.onAdComplete
            .then(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
                .done(self.settings.onAdComplete)
                .fail(self.settings.onError);
            });

            watcherPromises.onAdClose
            .then(function() {
                var closeWindow = function() {
                    window.parent.postMessage(self.settings.sendEvents.messageCloseWindow, "*");
                };

                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdClosed")
                .done(closeWindow)
                .fail(self.settings.onError);
            });
        });
};

playtemEmbedded.Affiz.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.affizContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl, $.noop);

            //affiz async init callback
            window.avAsyncInit = function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .fail(deferred.reject)
                .done(deferred.resolve);

                window.setTimeout(deferred.reject, 3000);
            };
        });
    });

    return deferred.promise();
};

playtemEmbedded.Affiz.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

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

    deferred.resolve(createFakePlayerImage());

    return deferred.promise();
};

playtemEmbedded.Affiz.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adCloseDeferred = $.Deferred();

    AFFIZVIDEO.init({
        site_id: self.settings.siteId,
        clientid: self.settings.clientid,
        modal: self.settings.modal,

        load_callback: function() {
            isAdAvailableDeferred.resolve();
        },
        noads_callback: function() {
            isAdAvailableDeferred.reject();
        },
        complete_callback: function() {
            adCompleteDeferred.resolve();
        },
        close_callback: function() {
            adCloseDeferred.resolve();
        }
    });

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdClose: adCloseDeferred.promise()
    };
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

playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        self.watcher()
        .done(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });
    });
};

playtemEmbedded.RevContent.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.revContentContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            self.injectScriptCustom()
            .fail(deferred.reject)
            .done(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.RevContent.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
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

    deferred.resolve(createTarget());

    return deferred.promise();
};

playtemEmbedded.RevContent.prototype.injectScriptCustom = function() {
    var self = this;

    var injectScriptDeferred = $.Deferred();

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
        injectScriptDeferred.resolve();
    };

    // onload equivalent for IE
    scriptElement.onreadystatechange = function () {
        if (this.readyState === "complete") {
            scriptElement.onload();
        }
    };

    scriptElement.onerror = function () {
        injectScriptDeferred.reject();
    };

    var revcontentElement = document.getElementById("revcontent");
    revcontentElement.appendChild(scriptElement);

    return injectScriptDeferred.promise();
};

playtemEmbedded.RevContent.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();

    var condition = function() {
        var $videoPlayerContainer = $("#revcontent");
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() > 10; // 10 is near random, real test should be height > 0

        return isVideoPlayerDefined && isVideoPlayerVisible;           
    };

    playtemEmbedded.Core.watch(condition)
    .done(function() {
        isAdAvailableDeferred.resolve();
    })
    .fail(function() {
        isAdAvailableDeferred.reject();
    });

    window.setTimeout(isAdAvailableDeferred.reject, 3000);

    return isAdAvailableDeferred.promise();
};

playtemEmbedded.Smartad = function(options) {
    var defaults = {
        debug: false,
        apiKey: undefined,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop
    };

    this.settings = {
        providerName: "Smartad",
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

playtemEmbedded.Smartad.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        self.watcher()
        .done(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });
    });
};

playtemEmbedded.Smartad.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.smartadContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl)
            .fail(deferred.reject)
            .done(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.Smartad.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node = "<div class='" + self.settings.targetClass + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("." + self.settings.targetClass).css(self.settings.cssProperties);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};

playtemEmbedded.Smartad.prototype.render = function() {
    var self = this;

    var divId = "sas_" + self.settings.formatId;
    $("." + self.settings.targetClass).attr("id", divId);

    sas.render(self.settings.formatId);
};


playtemEmbedded.Smartad.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();

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
                if (result && result.hasAd === true) {
                    isAdAvailableDeferred.resolve();
                }
                
                else {
                    isAdAvailableDeferred.reject();
                }
            }
        }
    );

    self.render();

    window.setTimeout(isAdAvailableDeferred.reject, 3000);

    return isAdAvailableDeferred.promise();
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

playtemEmbedded.SpotxInternal.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        var watcherPromises = self.watcher();

        watcherPromises.isAdAvailable
        .done(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdComplete
        .then(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
            .done(self.settings.onAdComplete)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdError
        .then(function() {
            var self = playtemEmbedded.Core.globals.spotxInternalContext;
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
            .then(self.settings.onError);
        });
    });
};

playtemEmbedded.SpotxInternal.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.spotxInternalContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            self.injectScriptCustom()
            .fail(deferred.reject)
            .done(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.SpotxInternal.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node =
            "<div class='playerWrapper'>" +
                "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
            "</div>";

        self.settings.$targetContainerElement.append(node);

        $(".playerWrapper").css(self.settings.cssProperties);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};

playtemEmbedded.SpotxInternal.prototype.injectScriptCustom = function() {
    var self = this;
    var injectScriptDeferred = $.Deferred();

    var script = document.createElement("script");
    script.async = true;
    script.src = self.settings.scriptUrl;

    for(var key in self.settings.scriptOptions) {
        if(self.settings.scriptOptions.hasOwnProperty(key)) {
            script.setAttribute('data-' + key, self.settings.scriptOptions[key]);
        }
    }

    script.onload = function () {
        injectScriptDeferred.resolve();
    };

    // onload equivalent for IE
    script.onreadystatechange = function () {
        if (this.readyState === "complete") {
            script.onload();
        }
    };

    script.onerror = function () {
        injectScriptDeferred.reject();
    };

    try {
        document.getElementsByTagName("body")[0].appendChild(script);
    } catch(e) {
        injectScriptDeferred.reject();
    }

    return injectScriptDeferred.promise();
};

playtemEmbedded.SpotxInternal.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adErrorDeferred = $.Deferred();

    window.spotXCallback = function(videoStatus) {
        if(videoStatus === true) {
            adCompleteDeferred.resolve();
        }
        
        else {
            if(adAvailableDeferred.state() == "pending") {
                isAdAvailableDeferred.reject();
            }
            // if I detect a player with my watcher and then I receive this, it's a video error
            else {
                adErrorDeferred.resolve();
            }
        }
    };

    var condition = function() {
        var $videoPlayerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
        var isVideoPlayerDefined = $videoPlayerContainer.length == 1;
        var isVideoPlayerVisible = $videoPlayerContainer.height() == self.settings.scriptOptions["spotx_content_height"];

        return isVideoPlayerDefined && isVideoPlayerVisible;
    };

    playtemEmbedded.Core.watch(condition)
    .done(function() {
        isAdAvailableDeferred.resolve();
    })
    .fail(function() {
        isAdAvailableDeferred.reject();
    });

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdError: adErrorDeferred.promise()
    };
};

playtemEmbedded.SpotxInstream = function(options) {
    var siteIdTest = "85394";
    var siteIdProductionInstream = "147520";

    this.siteId = (options.debug === true) ? siteIdTest : siteIdProductionInstream;

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
    var siteIdTest = "85394";
    var siteIdProductionOutstream = "146222";

    this.siteId = (options.debug === true) ? siteIdTest : siteIdProductionOutstream;

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

playtemEmbedded.PlaytemVastPlayer.prototype.clean = function() {
    var self = this;
    
    $("#" + self.settings.playerId).remove();
}

playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
        var watcherPromises = self.watcher();

        watcherPromises.isAdAvailable
        .done(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdAvailable")
            .done(self.settings.onAdAvailable)
            .fail(self.settings.onError);
        })
        .fail(function() {
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdUnavailable")
            .done(self.settings.onAdUnavailable)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdComplete
        .then(function() {
            self.clean();
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdComplete")
            .done(self.settings.onAdComplete)
            .fail(self.settings.onError);
        });

        watcherPromises.onAdError
        .then(function() {
            self.clean();
            playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "onAdError")
            .then(self.settings.onError);
        });
    });
};

playtemEmbedded.PlaytemVastPlayer.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl)
            .fail(deferred.reject)
            .done(function() {
                if(typeof RadiantMP == "undefined") {
                    deferred.reject();
                }

                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.PlaytemVastPlayer.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.playerPosition);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};

playtemEmbedded.PlaytemVastPlayer.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adErrorDeferred = $.Deferred();

    var videoPlayer = new RadiantMP(self.settings.playerId);
    var videoPlayerElement = document.getElementById(self.settings.playerId);
    
    if(!videoPlayer || typeof videoPlayer.init !== "function") {
        adErrorDeferred.resolve();
    }

    else {
        videoPlayerElement.addEventListener('adstarted', function() {
            isAdAvailableDeferred.resolve();
        });

        videoPlayerElement.addEventListener('aderror', function() {
            (adAvailableDeferred.state() == "pending") ? isAdAvailableDeferred.reject() : adErrorDeferred.resolve();
        });

        videoPlayerElement.addEventListener('adcomplete', function() {
            adCompleteDeferred.resolve();
        });

        videoPlayerElement.addEventListener('adskipped', function() {
            adCompleteDeferred.resolve();
        });
        
        videoPlayer.init(self.radiantMediaPlayerSettings);
    }

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdError: adErrorDeferred.promise()
    };
};

playtemEmbedded.PlaytemVastActiplay = function(options) {
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

playtemEmbedded.PlaytemVastActiplay.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/playtem-vast-wrapper-actiplay.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastActiplay",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};

playtemEmbedded.PlaytemVastVexigoInstream = function(options) {
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

playtemEmbedded.PlaytemVastVexigoInstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/playtem-vast-wrapper-vexigo-instream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastVexigoInstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};

playtemEmbedded.PlaytemVastVexigoOutstream = function(options) {
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

playtemEmbedded.PlaytemVastVexigoOutstream.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/playtem-vast-wrapper-vexigo-outstream.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastVexigoOutstream",

        onAdAvailable: self.settings.onAdAvailable,
        onAdUnavailable: self.settings.onAdUnavailable,
        onAdComplete: self.settings.onAdComplete,
        onAdError: self.settings.onAdError
    });

    self.vastPlayer.execute();
};

playtemEmbedded.PlaytemVastYume = function(options) {
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

playtemEmbedded.PlaytemVastYume.prototype.execute = function() {
    var self = this;

    var buildTag = function() {
        return "//static.playtem.com/tag/tagProviders/vast/playtem-vast-wrapper-yume.xml?" + playtemEmbedded.Core.Date.getCurrentTimestamp();
    };

    self.vastPlayer = new playtemEmbedded.PlaytemVastPlayer({
        debug: self.settings.debug,
        vastTag: buildTag(),
        apiKey: self.settings.apiKey,
        providerName: "PlaytemVastYume",

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