playtemEmbedded.Reward.prototype.getReward = function(callback) {
    var self = this;

    var onParseSuccess = function(rewardName, rewardImageUri) {
        if(self.settings.gameType == "desktop") {
            //reward img uri
            $("#rewardImageUri").attr("src", rewardImageUri);
            $("#rewardImageUri").css("visibility", "visible");
            //reward img name
            $("#rewardName").text(rewardName);
            $("#rewardName").css("visibility", "visible");
            //our partner
            $(".ad__reward__offerMessage__brandName").css("visibility", "visible");
            //offers you
            $("#js-rewardOfferingMessage").css("visibility", "visible");
        } else if(self.settings.gameType == "mobile") {
            //reward img ui
            $(".ad__reward__image").attr("src", rewardImageUri);
            $(".ad__reward__image").css("visibility", "visible");
            //reward name
            $(".ad__reward__offerMessage__rewardName").text(rewardName);
            $(".ad__reward__offerMessage__rewardName").css("visibility", "visible");
            //our partner
            $(".ad__header__title").css("visibility", "visible");
            //offers you
            $("#js-rewardOfferingMessage").css("visibility", "visible");
        } else {
            // todo handle error
            return;
        }
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
            playtemEmbedded.Core.log("Smartad template : ajax success", e);
            callback("parseResponse error: " + e, null);
        }
    };

    $.ajax({
        url: self.settings.scriptUrl,
        data: {
            apiKey : self.settings.apiKey,
            userId : self.settings.userId,
            timestamp : playtemEmbedded.Core.Date.getUnixCurrentTimestampSeconds()
        },
        success: parseResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            playtemEmbedded.Core.log("Smartad template : ajax error", errorThrown);
        }
    });
};