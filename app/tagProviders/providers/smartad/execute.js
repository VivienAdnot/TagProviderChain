playtemEmbeddedApp.TagProviderChain.Template.Reward.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        self.configure();

        self.fetchAdvert(function(error, result) {
            if(error) {
                callbcak(error);
            }

            result();
        });
    });
};