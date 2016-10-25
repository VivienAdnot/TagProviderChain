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

        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess");

        videoPlayerElement.addEventListener('adstarted', function() {
            self.onAdAvailable();
        });

        videoPlayerElement.addEventListener('aderror', function() {
            var errorType = videoPlayer.getAdErrorType();

            var setErrorType = function() {
                (self.adFound == true) ? self.onAdError() : self.onAdUnavailable();
            };

            switch(errorType) {
                case "adLoadError":
                    self.onAdUnavailable();
                    break;
                case "adPlayError":
                    self.onAdError();
                    break;
                default:
                    setErrorType();
            }
        });

        videoPlayerElement.addEventListener('adcomplete', function() {
            self.onAdComplete();
        });

        videoPlayerElement.addEventListener('adskipped', function() {
            self.onAdComplete();
        });
        
        videoPlayer.init(self.radiantMediaPlayerSettings);
    });
};