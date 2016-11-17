playtemEmbedded.Affiz.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.affizContext = self;

    self.createElements()
    .then(function() {
        playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "request")
        .fail(deferred.reject)
        .done(function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl, $.noop);

            //affiz async init callback
            window.avAsyncInit = function() {
                playtemEmbedded.Core.Ptrack(self.settings.providerName, self.settings.apiKey, "requestSuccess")
                .fail(deferred.reject)
                .done(deferred.resolve);

                window.setTimeout(deferred.reject, 3000);
            };
        });
    });

    return deferred.promise();
};

playtemEmbedded.Affiz.prototype.createElements = function() {
    var self = this;
    var deferred = $.Deferred();

    var createFakePlayerImage = function() {
        var node = "<img id='playerImg' src='//static.playtem.com/tag/tagProviders/templates/img/player.png' />";

        $("body").append(node);

        var $playerImg = $("#playerImg");

        $playerImg.css({
            position: "absolute",
            top: "190px",
            left: "0",
            right: "0",
            margin: "auto",
            width: "500px",
            height: "300px",
            cursor: "pointer"
        });

        $playerImg.one("click", function() {
            try {
                AFFIZVIDEO.show();
            } catch(e) {

            }
            
            $playerImg.hide();
        });
    };

    deferred.resolve(createFakePlayerImage());

    return deferred.promise();
};