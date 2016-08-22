playtemEmbedded.Core.PostMessage = function() {
    this.listenerPool = {};
};

playtemEmbedded.Core.PostMessage.prototype.listen = function(eventHandler) {
    var self = this;

    window.addEventListener("message", responseHandler, false);
    var poolLength = self.listenerPool.push(responseHandler);
    var listenerId = poolLength - 1;
    return listenerId;
};

playtemEmbedded.Core.PostMessage.prototype.send = function(message) {
    window.parent.postMessage(message, "*");
};

playtemEmbedded.Core.PostMessage.prototype.destroyListener = function(listenerId) {
    var self = this;

    var handler = self.listenerPool.splice(listenerId);
    window.removeEventListener("message", handler, false);
};