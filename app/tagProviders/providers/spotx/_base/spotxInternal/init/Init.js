playtemEmbedded.SpotxInternal.prototype.init = function() {
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

    createTarget();

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onFail: deferred.reject,
        onDone: function() {
            self.injectScriptCustom()
                .fail(deferred.reject)
                .done(function() {

                    playtemEmbedded.Core.track({
                        providerName: self.settings.providerName,
                        apiKey:  self.settings.apiKey,
                        eventType: "requestSuccess",
                        onFail: deferred.reject,
                        onDone: deferred.resolve
                    });
                });
        }
    });

    return deferred.promise();
};