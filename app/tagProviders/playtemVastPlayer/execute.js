playtemEmbedded.PlaytemVastPlayer.prototype.execute = function() {
    var self = this;

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.settings.cssProperties);
    };

    createTarget();

    playtemEmbedded.Core.track("playtemVastPlayer", self.settings.apiKey, "request");

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            self.settings.onError("PlaytemVastPlayer: script couldn't be loaded");
            return;
        }

        if(typeof RadiantMP == "undefined") {
            self.settings.onError("RadiantMP undefined");
            return;
        }
        
        var videoPlayer = new RadiantMP(self.settings.playerId);
        var videoPlayerElement = document.getElementById(self.settings.playerId);
        
        if(!videoPlayer) {
            self.clean();
            self.settings.onError("PlaytemVastPlayer: RadiantMP videoPlayer is null");
            return;
        }
        
        if(typeof videoPlayer.init !== "function") {
            self.clean();
            self.settings.onError("PlaytemVastPlayer: RadiantMP doesn't have method init");
            return;
        }

        videoPlayerElement.addEventListener('adloaded', function() {
            playtemEmbedded.Core.track("playtemVastPlayer", self.settings.apiKey, "onAdAvailable", function() {
                self.settings.onAdAvailable();
            });
        });

        videoPlayerElement.addEventListener('aderror', function() {
            self.clean();

            playtemEmbedded.Core.track("playtemVastPlayer", self.settings.apiKey, "onAdUnavailable", function() {
                self.settings.onAdUnavailable();
            });
        });

        videoPlayerElement.addEventListener('adcomplete', function() {
            self.clean();

            playtemEmbedded.Core.track("playtemVastPlayer", self.settings.apiKey, "onVideoComplete", function() {
                self.settings.onAdComplete();
            });
        });

        videoPlayerElement.addEventListener('adskipped', function() {
            self.clean();

            playtemEmbedded.Core.track("playtemVastPlayer", self.settings.apiKey, "onVideoComplete", function() {
                self.settings.onAdComplete();
            });
        });
        
        videoPlayer.init(self.radiantMediaPlayerSettings);
    });
};