playtemEmbedded.Smartad.prototype.execute = function(callback) {
    var self = this;

    playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "request");

    var onLoadHandler = function(result) {
        if (result && result.hasAd === true) {
            self.onAdAvailable();
        }
        
        else {
            self.onAdUnavailable();
        }
    };

    self.init(function(error) {
        if(error) {
            self.onScriptLoadingError();
            return;
        }
        
        playtemEmbedded.Core.track(self.settings.providerName, self.settings.apiKey, "requestSuccess");

        sas.setup({
            domain: self.settings.domain,
            async: true,
            renderMode: 0
        });

        sas.call("onecall",
            {
                siteId: self.settings.siteId,
                pageName: self.settings.pageName,
                formatId: self.settings.formatId
            },
            {
                onLoad: function(result) {
                    onLoadHandler(result);
                }
            }
        );

        self.render();
    });
};