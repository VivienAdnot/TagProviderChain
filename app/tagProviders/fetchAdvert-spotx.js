playtemEmbedded.TagProviders.prototype.fetchAdvert = function (callback) {
    var self = this;

    var provider = new playtemEmbedded.Spotx({
        debug: true
    });

    provider.execute(function (error, result) {
        if(error && error != "Spotx: no ad") {
            playtemEmbedded.Core.log("spotx", error);
        }

        callback(error, result);
    });
};