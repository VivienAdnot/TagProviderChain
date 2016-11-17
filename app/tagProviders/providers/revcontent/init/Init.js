playtemEmbedded.RevContent.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.revContentContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            self.injectScriptCustom()
            .fail(deferred.reject)
            .done(function() {
                playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .done(deferred.resolve)
                .fail(deferred.reject);
            });
        });
    });

    return deferred.promise();
};

playtemEmbedded.RevContent.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        self.settings.$targetContainerElement.append("<div id='revcontent'></div>");
        $("#revcontent").css({
            position: "absolute",
            top: 170,
            left: "0",
            right: "0",
            margin: "auto",
            width: 400,
            "text-align": "center"            
        });
    };

    deferred.resolve(createTarget());

    return deferred.promise();
};