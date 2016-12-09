playtemEmbedded.AppInstream = function(options) {
    
    if (!options) throw "options must be defined";
    if (typeof options.apiKey != "string") throw "apiKey must be a valid string";
    if (!options.providers || typeof options.providers != "object" || options.providers.length == 0) throw "providers must be a not empty array";
    if (typeof options.hasReward != "boolean") throw "hasReward must be a valid boolean";

    playtemEmbedded.AppSettings = $.extend(playtemEmbedded.AppSettings, options);
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
        if(playtemEmbedded.AppSettings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: playtemEmbedded.AppSettings.apiKey
            });

            rewarder.execute($.noop);
        }

        // wait for the reward to appear on the window
        window.setTimeout(playtemEmbedded.Core.globals.windowBlocker.clearBlocker, 1000);
    }    
};