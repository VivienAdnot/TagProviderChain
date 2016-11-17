playtemEmbedded.PlaytemVastPlayer.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl)
            .fail(deferred.reject)
            .done(function() {
                if(typeof RadiantMP == "undefined") {
                    deferred.reject();
                }

                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.PlaytemVastPlayer.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node = "<div id='" + self.settings.playerId + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("#" + self.settings.playerId).css(self.playerPosition);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};