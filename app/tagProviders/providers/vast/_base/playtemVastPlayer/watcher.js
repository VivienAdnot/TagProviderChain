playtemEmbedded.PlaytemVastPlayer.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var adCompleteDeferred = $.Deferred();
    var adErrorDeferred = $.Deferred();

    var videoPlayer = new RadiantMP(self.settings.playerId);
    var videoPlayerElement = document.getElementById(self.settings.playerId);
    
    if(!videoPlayer || typeof videoPlayer.init !== "function") {
        adErrorDeferred.resolve();
    }

    else {
        videoPlayerElement.addEventListener('adstarted', function() {
            isAdAvailableDeferred.resolve();
        });

        videoPlayerElement.addEventListener('aderror', function() {
            (adAvailableDeferred.state() == "pending") ? isAdAvailableDeferred.reject() : adErrorDeferred.resolve();
        });

        videoPlayerElement.addEventListener('adcomplete', function() {
            adCompleteDeferred.resolve();
        });

        videoPlayerElement.addEventListener('adskipped', function() {
            adCompleteDeferred.resolve();
        });
        
        videoPlayer.init(self.radiantMediaPlayerSettings);
    }

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        onAdComplete: adCompleteDeferred.promise(),
        onAdError: adErrorDeferred.promise()
    };
};