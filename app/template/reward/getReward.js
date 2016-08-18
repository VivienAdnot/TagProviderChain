playtemEmbeddedApp.TagProviderChain.Template.Reward.getReward = function(response, callback) {
    var self = this;

    var onParseSuccess = function() {
        $("#rewardImageUri").attr("src", rewardImageUri);
        $("#rewardName").text(rewardName);
    };

    var parseResponse = function(data) {
        try {
            if(data.StatusCode !== 0) {
                throw "no gift available: " + data.StatusCode + ", " + data.StatusMessage;
            }

            var response = data.Response;

            var rewardImageUri = response.Image;
            if(!rewardImageUri) {
                throw "no reward image";
            }

            var defaultLanguage = response.Name.Default;
            if(!defaultLanguage) {
                throw "no default Language";
            }

            var rewardName = response.Name[defaultLanguage];
            if(!rewardName) {
                throw "no reward Name";
            }

            onParseSuccess();
        } catch(e) {
            var logTag = "Smartad template : ajax success";
            var errorMessage = logTag + " : " + e;

            jQuery.post("https://ariane.playtem.com/Browser/Error", { message: errorMessage });
            console.log("get reward error: " + e);
        }
    };

    $.ajax({
        url: "//api.playtem.com/advertising/services.reward/",
        data: {
            ApiKey : apiKey,
            userId : userId,
            timestamp : getUnixTime()
        },
        success: parseResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            var logTag = "Smartad template : ajax error";
            var errorMessage = logTag + " : " + errorThrown;

            jQuery.post("https://ariane.playtem.com/Browser/Error", { message: errorMessage });
        }
    });
};