playtemEmbedded.Smartad.prototype.execute = function() {
    var self = this;

    self.init()
    .fail(self.settings.onAdUnavailable)
    .done(function() {
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
                    if (result && result.hasAd === true) {
                        self.onAdAvailable();
                    }
                    
                    else {
                        self.onAdUnavailable();
                    }
                }
            }
        );

        self.render();
    });
};