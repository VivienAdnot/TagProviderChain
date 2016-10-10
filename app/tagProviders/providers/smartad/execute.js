playtemEmbedded.Smartad.prototype.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        if(self.timeoutFired == true) {
            // callback has already been fired.
            return;
        }
        
        if(error != null) {
            self.settings.onError(error);
            return;
        }

        playtemEmbedded.Core.track("smartad", self.settings.apiKey, "request");

        sas.setup({
            domain: self.settings.domain,
            async: true,
            renderMode: 0
        });

        var loadHandler = function(result) {
            if (result && result.hasAd === true) {
                playtemEmbedded.Core.track("smartad", self.settings.apiKey, "onAdAvailable", function() {
                    self.settings.onAdAvailable();
                });
            } else {
                self.destructor();

                playtemEmbedded.Core.track("smartad", self.settings.apiKey, "onAdUnavailable", function() {
                    self.settings.onAdUnavailable();
                });
                return;
            }
        };

        sas.call("onecall",
            {
                siteId: self.settings.siteId,
                pageName: self.settings.pageName,
                formatId: self.settings.formatId
            },
            {
                onLoad: function(result) {
                    if(self.timeoutFired) {
                        return;
                    }

                    window.clearTimeout(self.timeoutTimer);
                    loadHandler(result);
                }
            }
        );

        // we have to call it outside of the callback
        self.render();
    });

    self.timeoutTimer = window.setTimeout(function () {
        self.destructor();
        self.timeoutFired = true;
        self.settings.onError("Smartad: timeout");
    }, self.settings.httpRequestTimeout);
};