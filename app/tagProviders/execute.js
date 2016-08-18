playtemApp.Main.TagProviders.prototype.execute = function (callback) {
    var self = this;

    self.fetchAdvert(function (error, result) {
        callback(error, result);
    });        
};