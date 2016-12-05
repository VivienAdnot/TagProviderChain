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
                (self.adFound == true) ? self.onError(playtemEmbedded.AppSettings.providerErrorTypes.invideo) : self.onAdUnavailable();
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