playtemEmbeddedApp.Reward.prototype.getReward = function(callback) {
    var self = this;

    var onParseSuccess = function(rewardName, rewardImageUri) {
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

            onParseSuccess(rewardName, rewardImageUri);

            callback(null, "parseResponse success");
        } catch(e) {
            playtemEmbeddedApp.Core.log("Smartad template : ajax success", e);
            callback("parseResponse error: " + e, null);
        }
    };

    $.ajax({
        url: self.settings.scriptUrl,
        data: {
            ApiKey : self.settings.apiKey,
            userId : self.settings.userId,
            timestamp : playtemEmbeddedApp.Core.Date.getUnixCurrentTimestampSeconds()
        },
        success: parseResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            playtemEmbeddedApp.Core.log("Smartad template : ajax error", errorThrown);
        }
    });
};