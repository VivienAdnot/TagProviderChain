playtemEmbedded.AppOutstream = function(options) {
    if (!options) throw "options must be defined";
    if (typeof options.apiKey != "string") throw "apiKey must be a valid string";
    if (typeof options.hasReward != "boolean") throw "hasReward must be a valid boolean";

    options.providers = options.providers || providers["outstream"][options.apiKey];

    playtemEmbedded.AppSettings = $.extend(playtemEmbedded.AppSettings, options);

    if(playtemEmbedded.AppSettings.hasReward === true) {
        playtemEmbedded.Core.globals.rewardManager = new playtemEmbedded.Reward({
            apiKey: playtemEmbedded.AppSettings.apiKey
        });

        playtemEmbedded.Core.globals.rewardManager.clear();
    }
};

playtemEmbedded.AppOutstream.prototype = {
    
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
        playtemEmbedded.Core.globals.debug = playtemEmbedded.AppSettings.debug;
    },

    onAdAvailable : function() {
        var self = this;
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdAvailable, "*");

        if(playtemEmbedded.AppSettings.hasReward == true) {
            playtemEmbedded.Core.globals.rewardManager.execute($.noop);
        }
    },

    onAllAdUnavailable : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
    },

    onComplete : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.defaultEnd, "*");
    }    
};