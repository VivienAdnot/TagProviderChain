playtemEmbedded.Affiz.prototype.init = function() {
    var self = this;

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
            AFFIZVIDEO.show();
            $playerImg.hide();
        });
    };

    createFakePlayerImage();

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request");

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            self.onInternalError();
        }
    });
};