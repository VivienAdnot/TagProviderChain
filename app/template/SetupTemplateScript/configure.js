playtemEmbeddedApp.TagProviderChain.Template.SetupTemplateScript.configure = function(callback) {
    var self = this;

    var jsTemplate = new PlaytemTemplate({
        clientType: "JavaScript",
        clickButtonUrl: "",
        brandName: "Our partner",

        policyUrl: "",
        outputLanguage: "en-US",
        policyIconUrl: "",

        campaignType: "1"
    });

    var cb = function(error, success) {
        var divId = "sas_" + formatId;
        $(".smartad").attr("id", divId);

        sas.render(formatId);
    };

    jsTemplate.execute(cb);
};