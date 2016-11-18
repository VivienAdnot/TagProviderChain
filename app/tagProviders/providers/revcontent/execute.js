playtemEmbedded.RevContent.prototype.execute = function() {
    var self = this;

    var isAdAvailableDeferred = $.Deferred();
    var internalErrorDeferred = $.Deferred();

    self.init()
    .fail(internalErrorDeferred.resolve)
    .done(function() {
        self.watcher()
        .done(isAdAvailableDeferred.resolve)
        .fail(isAdAvailableDeferred.reject);
    });

    return {
        isAdAvailable: isAdAvailableDeferred.promise(),
        internalError: internalErrorDeferred.promise()
    };    
};