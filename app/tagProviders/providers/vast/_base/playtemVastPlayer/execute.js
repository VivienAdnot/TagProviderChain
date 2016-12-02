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
                console.log("adstarted detected");
                self.onAdAvailable();
            });

            videoPlayerElement.addEventListener('aderror', function() {
                console.log("aderror detected");
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

            self.timeoutTimer = window.setTimeout(function () {
                self.onAdAvailable = $.noop;
                self.onAdUnavailable = $.noop;
                self.onAdComplete = $.noop;
                self.onError = $.noop;

                self.settings.onTimeout();
            }, playtemEmbedded.AppSettings.providerTimeout);
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