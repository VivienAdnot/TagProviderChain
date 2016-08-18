playtemEmbeddedApp.TagProviderChain.Template.Reward.init = function(callback) {
    var self = this;
    playtemEmbeddedApp.TagProviderChain.Core.injectScript(self.settings.scriptUrl, callback);
};