playtemEmbedded.TagProviders.prototype.fetchAdvert = function (deferreds) {
    var self = this;
    var index = 0;

    var executeCurrentProvider = function () {
        if (index >= self.settings.providers.length) {
            deferreds.isAdAvailable.reject();
        }
        
        else {
            var executeNextProvider = function () {
                index++;
                executeCurrentProvider();
            };

            var CurrentProviderCtor = self.settings.providers[index];

            var provider = new CurrentProviderCtor({
                debug: self.settings.debug,
                apiKey: self.settings.apiKey
            });

            var providerPromises = provider.execute();

            providerPromises.isAdAvailable
            .done(deferreds.isAdAvailable.resolve)
            .fail(executeNextProvider);

            providerPromises.videoComplete
            .done(deferreds.videoComplete.resolve)
            .fail(deferreds.videoComplete.reject);
        }
    };
    
    var isArray = function(target) {
        return Object.prototype.toString.call(target) == "[object Array]";
    };    

    if(isArray(self.settings.providers) && self.settings.providers.length > 0)) {
        executeCurrentProvider();
    }
    
    else {
        playtemEmbedded.Core.log("fetchAdvert", "providers list is empty or not an array");
        deferreds.videoComplete.resolve("internalError");
    }

    return deferreds;
};