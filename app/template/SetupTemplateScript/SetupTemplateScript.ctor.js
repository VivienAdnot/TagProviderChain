playtemEmbeddedApp.TagProviderChain.Template.SetupTemplateScript = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: "//static.playtem.com/templates/js/templatedisplay.js"
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};