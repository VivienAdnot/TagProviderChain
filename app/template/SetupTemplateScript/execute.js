playtemEmbeddedApp.TagProviderChain.Template.SetupTemplateScript.execute = function(callback) {
    var self = this;

    self.init(function(error, data) {
        self.configure();
    });
};