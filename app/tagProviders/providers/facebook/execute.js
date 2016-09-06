playtemEmbedded.Facebook.prototype.execute = function(callback) {
    var self = this;

    playtemEmbedded.Core.createTracker("Facebook", "execute");

    self.setupUi();
    self.fetchAdvert(function(error, data) {
        if(!error && data == "success") {
            self.render();
        }

        callback(error, data);
    });
};