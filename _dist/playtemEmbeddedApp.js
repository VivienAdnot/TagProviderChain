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

    var templateSetup = new playtemEmbedded.Template({
        hasReward: self.settings.hasReward,
        apiKey: self.settings.apiKey,
        gameType: self.settings.gameType
    });

    templateSetup.setup();

    var tagProviders = new playtemEmbedded.TagProviders({
        providers: self.settings.providers
    });
    
    tagProviders.execute(function(error, result) 
    {
    });
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
    var url = "https://ariane.playtem.com/Browser/Error";
    var logLovel = "error";
    var clientVersion = "JSEmbedded-0.0.1";

    var logPrefix = clientVersion + " : " + (tag ? tag + ": " : "");
    var formattedMessage = logPrefix + message.toString();

    jQuery.post(url, { message: formattedMessage });
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
        providers : []
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
    var self = this;
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

    run();
};

playtemEmbedded.Smartad = function(options) {
    var defaults = {
        debug: false
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
    var timeoutFired = false;

    self.init(function(error, data) {
        if(timeoutFired == true) {
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
                    if(timeoutFired) {
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
        timeoutFired = true;
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


playtemEmbedded.Template = function(options) {
    var defaults = {
        apiKey: undefined,
        gameType: undefined,
        hasReward: false,
        outputLanguage: "en-US",
        debug: false,
    };

    this.settings = {
        scripts: {
            setupTemplate: "//static.playtem.com/templates/js/templatedisplay.js",
            reward: "reward.js"
        }
    };
    
    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);    
};

playtemEmbedded.Template.prototype.executeTemplateScript = function(callback) {
    var self = this;
    var scriptUrl = "//static.playtem.com/templates/js/templatedisplay.js";

    playtemEmbedded.Core.injectScript(scriptUrl, function(error, data) {
        var jsTemplate = new PlaytemTemplate({
            clientType: "JavaScript",
            clickButtonUrl: "",
            brandName: "Our partner",

            policyUrl: "",
            outputLanguage: self.settings.outputLanguage,
            policyIconUrl: "",

            campaignType: "1"
        });

        var playtemTemplateCallback = function(error, data) {
            /*console.log("executeTemplateScript callback");
            console.log(error);
            console.log(data);*/
        };

        jsTemplate.execute(playtemTemplateCallback);
    });
};

playtemEmbedded.Reward = function(options) {
    var defaults = {
        debug: false,
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

playtemEmbedded.Reward.prototype.execute = function(callback) {
    var self = this;

    self.init(callback, function(error, data) {
        if(error != null) {
            // handle error
        }

        window.addEventListener("message", self.userIdMessageHandler, false);

        window.parent.postMessage(self.settings.sendEvents.userId, "*");

        // we don't set up a timeout because this module is not critical for the app if it fails.
        // create a default reward in the html template in case of error
    });
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

playtemEmbedded.Reward.prototype.init = function(executeCallback, callback) {
    var self = this;

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

    if(!self.settings.apiKey) {
        callback("window.apiKey undefined", null);
        return;        
    }

    self.executeCallback = executeCallback;
    playtemEmbedded.Core.globals.playtemRewardContext = self;

    callback(null, "success");
};

playtemEmbedded.Reward.prototype.userIdMessageHandler = function(postMessage) {
    var self = playtemEmbedded.Core.globals.playtemRewardContext;
    var playtemIdentifier = "playtem:js:";

    if(!postMessage || !postMessage.data) {
        self.executeCallback("invalid postmessage", null);
    }

    var userIdMessage = postMessage.data;

    if(userIdMessage.indexOf(playtemIdentifier) != 0) {
        return;
    }

    var checkUserIsNumber = function() {
        //todo
    };

    var extractUserId = function() {
        return userIdMessage.substring(playtemIdentifier.length);
    };

    self.userId = extractUserId();

    self.getReward(self.executeCallback);
};

playtemEmbedded.Template.prototype.setup = function() {
    var self = this;

    self.executeTemplateScript();

    if(self.settings.hasReward == true) {
        var rewarder = new playtemEmbedded.Reward({
            apiKey: self.settings.apiKey,
            gameType: self.settings.gameType
        });

        rewarder.execute(function(error, result) {

        });
    }
};