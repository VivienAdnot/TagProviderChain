playtemEmbedded.TagProviders.prototype.execute = function () {
    var self = this;

    var onAdAvailable = function() {
        window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");

        if(self.settings.blockWindow == true) {
            self.windowBlocker.setBlocker();
        }
    };

    var onAdUnavailable = function() {
        window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
    };

    var onAdComplete = function() {
        var always = function() {
            if(self.settings.blockWindow == true) {
                self.windowBlocker.clearBlocker();
            }
        };

        if(self.settings.hasReward == true) {
            var rewarder = new playtemEmbedded.Reward({
                apiKey: self.settings.apiKey
            });

            rewarder.execute(function(error, success) {
                always();
            });
        } else {
            always();
        }
    };

    self.fetchAdvert(onAdAvailable, onAdUnavailable, onAdComplete);
};