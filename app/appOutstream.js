playtemEmbedded.AppOutstream = function(options) {
    
    if (!options) throw "options must be defined";
    if (typeof options.apiKey != "string") throw "apiKey must be a valid string";
    if (!options.providers || typeof options.providers != "object" || options.providers.length == 0) throw "providers must be a not empty array";
    if (typeof options.hasReward != "boolean") throw "hasReward must be a valid boolean";

    playtemEmbedded.AppSettings = $.extend(playtemEmbedded.AppSettings, options);
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
            var rewarder = new playtemEmbedded.Reward({ apiKey: playtemEmbedded.AppSettings.apiKey });
            rewarder.execute($.noop);
        }
    },

    onAllAdUnavailable : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.onAdUnavailable, "*");
    },

    onComplete : function() {
        window.parent.postMessage(playtemEmbedded.AppSettings.IframeManagerEvents.defaultEnd, "*");
    }    
};