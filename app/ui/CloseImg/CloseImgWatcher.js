playtemEmbedded.CloseImgWatcher = function() {
    var self = this;

    this.settings = {
        sendEvents: {
            closeWindow : "closeAdWindow"
        }
    };

    this.watchClick = function() {
        playtemEmbedded.AppSettings.$closeImgElement.click(function () {
            window.parent.postMessage(self.settings.sendEvents.closeWindow, "*");
        });
    };

    this.watchClick();
};