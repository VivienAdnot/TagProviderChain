playtemEmbedded.Reward.prototype.UIHideElements = function() {
    var deferred = $.Deferred();

    var hideElements = function() {
        //reward img uri
        $("#rewardImageUri").css("visibility", "hidden");
        //reward img name
        $("#rewardName").css("visibility", "hidden");

        $(".ad__reward__offerMessage__brandName").css("visibility", "hidden");
        $("#js-rewardOfferingMessage").css("visibility", "hidden");
    };

    deferred.resolve(hideElements());

    return deferred.promise();
};

playtemEmbedded.Reward.prototype.UIShowElements = function() {
    var deferred = $.Deferred();

    var showElements = function() {
        //reward img uri
        $("#rewardImageUri").attr("src", rewardImageUri);
        $("#rewardImageUri").css("visibility", "visible");
        //reward img name
        $("#rewardName").text(rewardName);
        $("#rewardName").css("visibility", "visible");
        //our partner
        $(".ad__reward__offerMessage__brandName").text("Our partner");
        //offers you
        $("#js-rewardOfferingMessage").text("offers you");
    };

    deferred.resolve(showElements());

    return deferred.promise();
};