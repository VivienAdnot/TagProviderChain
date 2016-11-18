playtemEmbedded.Reward.prototype.execute = function() {
    var self = this;
    var deferred = $.Deferred();

    if(!self.settings.apiKey) {
        deferred.reject();
    }

    else {
        self.UIHideElements()
        .then(function() {
            self.requestUserId()
            .fail(function() {
                deferred.reject("request user id failed");
            })
            .done(function(playtemUserId) {
                self.getReward(playtemUserId)
                .fail(function(errorMessage) {
                    deferred.reject(errorMessage);
                })
                .done(function(result) {
                    self.UIShowElements(result.name, result.imageUri)
                    .then(deferred.resolve);
                })
            });
        })
    }

    return deferred.promise();
};