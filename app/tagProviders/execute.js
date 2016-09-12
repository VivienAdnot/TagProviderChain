playtemEmbedded.TagProviders.prototype.execute = function (callback) {
    var self = this;

    self.fetchAdvert(function (error, result) {
        if(result == "success") {
            if(self.settings.hasReward == true) {
                var rewarder = new playtemEmbedded.Reward({
                    apiKey: self.settings.apiKey,
                    gameType: self.settings.gameType
                });

                rewarder.run();
            }

            window.parent.postMessage(self.settings.sendEvents.onAdAvailable, "*");
        } else {
            window.parent.postMessage(self.settings.sendEvents.onAdUnavailable, "*");
        }

        if(typeof callback == "function") {
            callback(error, result);
        }
    });
};