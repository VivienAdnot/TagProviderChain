playtemApp.Main.TagProviders.prototype.fetchAdvert = function (callback) {
    var self = this;

    var executeProvider = function (AdvertProvider) {
        var provider = new AdvertProvider();

        provider.execute(function (error, result) {
            if (error !== null) {
                moveNext();
                return;
            }

            callback(error, result);
        });
    };

    var moveNext = function () {
        self.index++;
        run();
    };

    var run = function () {
        var __local = {
            applicationSettings: playtemApp.Settings.providers.client2Server.shared.applicationSettings,
            client2ServerBindings: playtemApp.Settings.providers.client2Server.shared.bindings
        };
        
        var errorMessage = null;

        if (self.index >= self.providers.length) {
            callback("no more provider to call", null);
            return;
        }

        var currentProviderReference = self.providers[self.index];
        executeProvider(currentProviderReference);
    };

    run();
};