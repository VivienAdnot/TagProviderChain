playtemEmbedded.Affiz.prototype.execute = function(callback) {
    var self = this;

    var onAdAvailable = function() {
        clearTimeout(self.timeoutTimer);
        self.windowBlocker.setBlocker();
        callback(null, "success");
        AFFIZVIDEO.show();
    };

    var onAdUnavailable = function() {
        clearTimeout(self.timeoutTimer);
        callback("Affiz: no ad", null);
    };

    var onVideoComplete = function() {
        self.windowBlocker.clearBlocker();
    };

    window.avAsyncInit = function() {
        AFFIZVIDEO.init({
            site_id: '315f315f393336_d465200f9f', // todo set
            clientid: "0000", // todo set
            load_callback: onAdAvailable,
            noads_callback: onAdUnavailable,
            complete_callback: onVideoComplete,
            modal: false
        });
    };

    self.timeoutTimer = window.setTimeout(function () { // todo attach self
        self.destructor();
        onAdAvailable = playtemEmbedded.Core.Operations.noop; // todo test
        onAdUnavailable = playtemEmbedded.Core.Operations.noop;
        onVideoComplete = playtemEmbedded.Core.Operations.noop;

        callback("Affiz: timeout", null);
    }, self.settings.httpRequestTimeout);

    var createTarget = function() {
        var node =
        "<div class='playerWrapper'>" +
            "<div id='" + self.settings.target + "'></div>" +
        "</div>";

        self.settings.$targetContainerElement.append(node);
        $(".playerWrapper").css({
            width: "500px",
            height: "350px"
        });
    };

    createTarget();

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        if(error) {
            callback("Affiz: script couldn't be loaded", null);
            self.destructor();
        }
    });    
};