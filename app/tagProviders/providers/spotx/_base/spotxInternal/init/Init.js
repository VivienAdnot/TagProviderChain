playtemEmbedded.SpotxInternal.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            self.injectScriptCustom()
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

playtemEmbedded.SpotxInternal.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node =
            "<div class='playerWrapper'>" +
                "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
            "</div>";

        self.settings.$targetContainerElement.append(node);

        $(".playerWrapper").css(self.settings.cssProperties);
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};