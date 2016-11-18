playtemEmbedded.Smartad.prototype.watcher = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();

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
                    isAdAvailableDeferred.resolve();
                }
                
                else {
                    isAdAvailableDeferred.reject();
                }
            }
        }
    );

    self.render();

    window.setTimeout(isAdAvailableDeferred.reject, 3000);

    return isAdAvailableDeferred.promise();
};