playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    self.init(function(error) {
        if(error) {
            self.onInternalError();
            return;
        }

        if(typeof RadiantMP == "undefined") {
            self.onInternalError();
            return;
        }
        
        var videoPlayer = new RadiantMP(self.settings.playerId);
        var videoPlayerElement = document.getElementById(self.settings.playerId);
        
        if(!videoPlayer || typeof videoPlayer.init !== "function") {
            self.onInternalError();
            return;
        }

        videoPlayerElement.addEventListener('adstarted', function() {
            self.onAdAvailable();
        });

        videoPlayerElement.addEventListener('aderror', function() {
            self.onAdUnavailable();
        });

        videoPlayerElement.addEventListener('adcomplete', function() {
            self.onVideoComplete();
        });

        videoPlayerElement.addEventListener('adskipped', function() {
            self.onVideoComplete();
        });
        
        videoPlayer.init(self.radiantMediaPlayerSettings);
    });
};