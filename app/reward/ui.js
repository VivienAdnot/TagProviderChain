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

playtemEmbedded.Reward.prototype.UIShowElements = function(name, imageUri) {
    var deferred = $.Deferred();

    var showElements = function() {
        //reward img uri
        $("#rewardImageUri").attr("src", imageUri);
        $("#rewardImageUri").css("visibility", "visible");
        //reward img name
        $("#rewardName").text(name);
        $("#rewardName").css("visibility", "visible");
        //our partner
        $(".ad__reward__offerMessage__brandName").text("Our partner");
        $(".ad__reward__offerMessage__brandName").css("visibility", "visible");
        //offers you
        $("#js-rewardOfferingMessage").text("offers you");
        $("#js-rewardOfferingMessage").css("visibility", "visible");
    };

    deferred.resolve(showElements());

    return deferred.promise();
};