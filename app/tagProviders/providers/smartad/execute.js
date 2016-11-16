playtemEmbedded.Smartad.prototype.execute = function(callback) {
    var self = this;

    var onLoadHandler = function(result) {
        if (result && result.hasAd === true) {
            self.onAdAvailable();
        }
        
        else {
            self.onAdUnavailable();
        }
    };

    var initialize = function() {
        self.init(function(error) {
            if(error) {
                self.settings.onAdUnavailable();
                return;
            }
            
            var execute = function() {
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
            };

            playtemEmbedded.Core.track({
                providerName: self.settings.providerName,
                apiKey:  self.settings.apiKey,
                eventType: "requestSuccess",
                onDone: execute,
                onFail: self.settings.onAdUnavailable
            });
        });
    };

    playtemEmbedded.Core.track({
        providerName: self.settings.providerName,
        apiKey:  self.settings.apiKey,
        eventType: "request",
        onDone: initialize,
        onFail: self.settings.onAdUnavailable
    });
};