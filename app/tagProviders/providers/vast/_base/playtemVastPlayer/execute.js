playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    self.init(function(error) {
        if(error) {
            self.onScriptLoadingError();
            return;
        }
        
        if(typeof RadiantMP == "undefined") {
            self.onScriptLoadingError();
            return;
        }
        
        var videoPlayer = new RadiantMP(self.settings.playerId);
        var videoPlayerElement = document.getElementById(self.settings.playerId);
        
        if(!videoPlayer || typeof videoPlayer.init !== "function") {
            self.onScriptLoadingError();
            return;
        }

        var runPlayer = function() {
            videoPlayerElement.addEventListener('adstarted', function() {
                self.onAdAvailable();
            });

            videoPlayerElement.addEventListener('aderror', function() {
                console.log(videoPlayer.getAdErrorCode());
                (self.adFound == true) ? self.onAdError() : self.onAdUnavailable();
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