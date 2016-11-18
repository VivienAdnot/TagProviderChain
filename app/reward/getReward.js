playtemEmbedded.Reward.prototype.getReward = function(playtemUserId) {
    var self = this;
    var deferred = $.Deferred();

    $.get(self.settings.scriptUrl, {
        apiKey : self.settings.apiKey,
        userId : playtemUserId,
        timestamp : playtemEmbedded.Core.Date.getUnixCurrentTimestampSeconds()
    })
    .fail(function() {
        deferred.reject("playtem ajax call failed");
    })
    .done(function(data) {
        try {
            if(data.StatusCode !== 0) {
                throw "no gift available: " + data.StatusCode + ", " + data.StatusMessage;
            }

            var response = data.Response;

            var rewardImageUri = response.Image;
            if(!rewardImageUri) {
                throw "no reward image";
            }

            var defaultLanguage = response.Name.Default;
            if(!defaultLanguage) {
                throw "no default Language";
            }

            var rewardName = response.Name[defaultLanguage];
            if(!rewardName) {
                throw "no reward Name";
            }

            deferred.resolve(function() {
                return {
                    name: rewardName,
                    imageUri: rewardImageUri
                };
            }());
        } catch(e) {
            deferred.reject("reward parse response error: " + e);
        }
    });

    return deferred.promise();
};