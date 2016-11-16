playtemEmbedded.RevContent.prototype.init = function(callback) {
    var self = this;

    var createTarget = function(callback) {
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

    createTarget();

    self.injectScriptCustom(function(error, result) {
        callback(error);
    });
};