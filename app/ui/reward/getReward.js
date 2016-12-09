playtemEmbedded.Reward.prototype.getReward = function(callback) {
    var self = this;

    var onParseSuccess = function(rewardName, rewardImageUri) {
        //reward img uri
        $("#rewardImageUri").attr("src", rewardImageUri);
        $("#rewardImageUri").css("visibility", "visible");
        
        //reward img name
        $("#rewardName").text(rewardName);
        $("#rewardName").css("visibility", "visible");

        //our partner
        var partnerText = $(".ad__reward__offerMessage__brandName").text();
        partnerText = (partnerText != "") ? partnerText : "Our partner";
        $(".ad__reward__offerMessage__brandName").text(partnerText);
        $(".ad__reward__offerMessage__brandName").css("visibility", "visible");
        
        //offers you
        var offerText = $("#js-rewardOfferingMessage").text();
        offerText = (offerText != "") ? offerText : "offers you";
        $("#js-rewardOfferingMessage").text(offerText);
        $("#js-rewardOfferingMessage").css("visibility", "visible");
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

            callback(null, "success");
        } catch(e) {
            var errorMessage = "reward parse response error: " + e;
            playtemEmbedded.Core.log("playtemEmbedded", errorMessage);
            callback(errorMessage, null);
        }
    };

    $.ajax({
        url: self.settings.scriptUrl,
        data: {
            apiKey : playtemEmbedded.AppSettings.apiKey,
            userId : self.userId,
            timestamp : playtemEmbedded.Core.Date.getUnixCurrentTimestampSeconds()
        },
        success: parseResponse,
        error: function(jqXHR, textStatus, errorThrown) {
            var errorMessage = "reward ajax error: " + errorThrown;
            playtemEmbedded.Core.log("playtemEmbedded", errorMessage);
            callback(errorMessage, null);
        }
    });
};