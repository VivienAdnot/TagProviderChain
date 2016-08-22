playtemEmbedded.Smartad.prototype.execute = function(callback) {
    var self = this;

    playtemEmbedded.Core.injectScript(self.settings.scriptUrl, function(error, data) {
        // todo create div

        if(error != null) {
            callback("smartad: script injection error", null)
            return;
        }

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
                onLoad: function(o) {
                    if (o && o.hasAd === true) {
                        callback(null, "success");
                        return;
                    } else {
                        callback("no ad", null);
                        return;
                    }
                }
            }
        );

        // we have to call it outside of the callback
        self.render();
    });
};