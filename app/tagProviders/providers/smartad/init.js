playtemEmbedded.Smartad.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.PinjectScript(self.settings.scriptUrl)
            .fail(deferred.reject)
            .done(function() {
                playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.Smartad.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node = "<div class='" + self.settings.targetClass + "'></div>";

        self.settings.$targetContainerElement.append(node);
        $("." + self.settings.targetClass).css(self.settings.cssProperties);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};