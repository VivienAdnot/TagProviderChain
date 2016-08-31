playtemEmbedded.Facebook.prototype.execute = function(callback) {
    var self = this;

    self.init(function() {
        $(".thirdPartyTitleClass").text("title test");
        $(".thirdPartyMediaClass").text("media test");
        $(".thirdPartyBodyClass").text("body test");
        $(".thirdPartyCallToActionClass").text("cta test");
    });

    callback(null, "success");
};