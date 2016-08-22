playtemEmbedded.Template.prototype.executeTemplateScript = function(callback) {
    var scriptUrl = "//static.playtem.com/templates/js/templatedisplay.js";

    playtemEmbedded.Core.injectScript(scriptUrl, function(error, data) {
        var jsTemplate = new PlaytemTemplate({
            clientType: "JavaScript",
            clickButtonUrl: "",
            brandName: "Our partner",

            policyUrl: "",
            outputLanguage: "en-US",
            policyIconUrl: "",

            campaignType: "1"
        });

        var playtemTemplateCallback = function(error, data) {
            /*console.log("executeTemplateScript callback");
            console.log(error);
            console.log(data);*/
        };

        jsTemplate.execute(playtemTemplateCallback);
    });
};