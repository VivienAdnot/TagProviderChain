playtemEmbedded.AppInstream = function(options) {
    if (!options) throw "options must be defined";
    if (typeof options.apiKey != "string") throw "apiKey must be a valid string";
    if (typeof options.hasReward != "boolean") throw "hasReward must be a valid boolean";

    options.providers = options.providers || providers["rewarded"][options.apiKey];

    playtemEmbedded.AppSettings = $.extend(playtemEmbedded.AppSettings, options);

    if(playtemEmbedded.AppSettings.hasReward === true) {
        playtemEmbedded.Core.globals.rewardManager = new playtemEmbedded.Reward({
            apiKey: playtemEmbedded.AppSettings.apiKey
        });

        playtemEmbedded.Core.globals.rewardManager.clear();
    }
};

playtemEmbedded.AppInstream.prototype = {
    
    execute : function() {
        var self = this;

        var tagProviders = new playtemEmbedded.TagProviders({
            appCallbacks: {
                onAdAvailable : self.onAdAvailable,
                onAllAdUnavailable : self.onAllAdUnavailable,
                onComplete : self.onComplete
            }
        });
        
        tagProviders.execute();

        new playtemEmbedded.CloseImgWatcher();
        playtemEmbedded.Core.globals.windowBlocker = new playtemEmbedded.WindowBlocker();
        playtemEmbedded.Core.globals.debug = playtemEmbedded.AppSettings.debug;
    },

    onAdAvailable : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");
        playtemEmbedded.Core.globals.windowBlocker.setBlocker();
    },

    onAllAdUnavailable : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
    },

    onComplete : function() {
        var self = this;

        if(playtemEmbedded.AppSettings.hasReward == true) {
            playtemEmbedded.Core.globals.rewardManager.execute($.noop);
        }

        // wait for the reward to appear on the window
        window.setTimeout(playtemEmbedded.Core.globals.windowBlocker.clearBlocker, 1000);
    }    
};