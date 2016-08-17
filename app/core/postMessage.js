playtemEmbeddedApp.TagProviderChain.Core.PostMessage = function() {
    this.listenerPool = {};
};

playtemEmbeddedApp.TagProviderChain.Core.PostMessage.prototype.listen = function(eventHandler) {
    var self = this;

    window.addEventListener("message", responseHandler, false);
    var poolLength = self.listenerPool.push(responseHandler);
    var listenerId = poolLength - 1;
    return listenerId;
};

playtemEmbeddedApp.TagProviderChain.Core.PostMessage.prototype.send = function(message) {
    window.parent.postMessage(message, "*");
};

playtemEmbeddedApp.TagProviderChain.Core.PostMessage.prototype.destroyListener = function(listenerId) {
    var self = this;

    var handler = self.listenerPool.splice(listenerId);
    window.removeEventListener("message", handler, false);
};

playtemEmbeddedApp.TagProviderChain.Core.PostMessage = {
    listen: function(eventHandler) {
        window.addEventListener("message", responseHandler, false);
    },

    send: function(message) {
        window.parent.postMessage(message, "*");
    }
};