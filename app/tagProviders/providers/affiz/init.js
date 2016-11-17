playtemEmbedded.Affiz.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    playtemEmbedded.Core.globals.affizContext = self;

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

    createFakePlayerImage();
    
    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onFail: deferred.reject,
        onDone: function() {
            playtemEmbedded.Core.injectScript(self.settings.scriptUrl, $.noop);

            window.avAsyncInit = function() {

                playtemEmbedded.Core.track({
                    providerName: self.settings.providerName,
                    apiKey:  self.settings.apiKey,
                    eventType: "requestSuccess",
                    onFail: deferred.reject,
                    onDone: function() {
                        deferred.resolve();
                    }
                });

                window.setTimeout(deferred.reject, 5000);
            };
        }
    });

    return deferred.promise();
};