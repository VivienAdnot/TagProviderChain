playtemEmbeddedApp.TagProviderChain.Template.SetupTemplateScript.configure = function(callback) {
    var self = this;

    var onLoadHandler = function(o) {
        if (o && o.hasAd === true) {
            callback(null, true);
        } else {
            callback("no ad", null);
        }
    };

    sas.call("onecall",
        {
            siteId: siteId,
            pageName: pageName,
            formatId: formatId
        },
        {
            onLoad: onLoadHandler
        }
    );

    //todo run timeout
};