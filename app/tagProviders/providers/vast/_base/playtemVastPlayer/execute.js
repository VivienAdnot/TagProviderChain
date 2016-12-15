playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    var extractProviderName = function(adWrapperAdSystems) {
        var providerName = null;

        try {
            providerName = adWrapperAdSystems.pop();
            var isProviderNameAllowed = (playtemEmbedded.AppSettings.vastProviderNames.indexOf(providerName) != -1);

            if(!isProviderNameAllowed) {
                throw "providerName unknown: " + providerName.toString();
            }
        } catch(e) {
            playtemEmbedded.Core.logError("PlaytemVastPlayer", "adWrapperAdSystems exception" + e);
            providerName = null;
        }

        return providerName;
    };

    var runPlayer = function() {
        self.videoPlayerElement.addEventListener('adstarted', function() {
            self.adFound = true;
            
            var providerName = extractProviderName(self.videoPlayer.getAdWrapperAdSystems());
            (providerName) ? self.onAdAvailable(providerName) : self.onError();
        });

        self.videoPlayerElement.addEventListener('aderror', function() {
            (self.adFound == true) ? self.onError() : self.onAdUnavailable();
        });

        self.videoPlayerElement.addEventListener('adcomplete', function() {
            self.onAdComplete();
        });

        self.videoPlayerElement.addEventListener('adskipped', function() {
            self.onAdComplete();
        });
        
        self.videoPlayer.init(self.radiantMediaPlayerSettings);
    };

    self.init(function(error) {
        if(error) {
            self.settings.onAdUnavailable();
            return;
        }
        
        if(typeof RadiantMP == "undefined") {
            self.settings.onAdUnavailable();
            return;
        }
        
        self.videoPlayer = new RadiantMP(self.settings.playerId);
        self.videoPlayerElement = document.getElementById(self.settings.playerId);
        
        if(!self.videoPlayer || typeof self.videoPlayer.init !== "function" || typeof self.videoPlayer.getAdWrapperAdSystems !== "function") {
            playtemEmbedded.Core.logError("PlaytemVastPlayer", "api method unavailable");
            self.settings.onAdUnavailable();
            return;
        }

        playtemEmbedded.Core.track({
            providerName: self.settings.providerName,
            apiKey:  playtemEmbedded.AppSettings.apiKey,
            eventType: "requestSuccess",
            onAlways: runPlayer
        });

        self.timeoutTimer = window.setTimeout(function () {
            self.onAdAvailable = $.noop;
            self.onAdUnavailable = $.noop;
            self.onAdComplete = $.noop;

            self.onError(playtemEmbedded.AppSettings.providerErrorTypes.timeout);
        }, playtemEmbedded.AppSettings.providerTimeout);
    });
};