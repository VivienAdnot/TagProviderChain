playtemEmbedded.TagProviders.prototype.fetchAdvert = function (callback) {
    var self = this;
    var index = 0;

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider();

        provider.execute(function (error, result) {
            if (error !== null) {
                console.log("execute provider result error: " + error);
                moveNext();
                return;
            }

            callback(error, result);
        });
    };

    var moveNext = function () {
        index++;
        run();
    };

    var run = function () {
        if (index >= self.providers.length) {
            callback("no more provider to call", null);
            return;
        }

        var currentProviderReference = self.providers[index];
        executeProvider(currentProviderReference);
    };

    run();
};