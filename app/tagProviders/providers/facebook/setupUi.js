playtemEmbedded.Facebook.prototype.setupUi = function() {
    var self = this;

    var node = 
        '<div class="facebookAdWrapper">' +
            '<div class="fb-ad" data-placementid="992123530865458_992138464197298" data-format="native" data-nativeadid="ad_root" data-testmode="false"></div>' +
            '<div id="ad_root">' +
                '<a class="fbAdLink">' +
                    '<div class="fbAdMedia thirdPartyMediaClass"></div>' +
                    '<div class="fbAdTitle thirdPartyTitleClass"></div>' +
                    '<div class="fbAdBody thirdPartyBodyClass"></div>' +
                    '<div class="fbAdCallToAction thirdPartyCallToActionClass"></div>' +
                '</a>'+
            '</div>' +
        '</div>';

    self.settings.$targetContainerElement.append(node);

    $(".facebookAdWrapper").css({
        "position": "absolute",
        "top": "60px",
        "left": "35px"
    });

    $("#ad_root").css({
        "display": "none",
        "font-size": "8px",
        "height": "180px",
        "line-height": "10px",
        "position": "relative",
        "width": "180px",
        "text-align": "center",
        "color": "#ffffff"
    });

    $(".thirdPartyMediaClass").css({
        "height": "113px",
        "width": "180px"
    });

    $(".thirdPartyTitleClass").css({
        "font-weight": "600",
        "font-size": "9px",
        "margin": "8px 0 4px 0",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap"
    });

    $(".thirdPartyBodyClass").css({
        "display": "-webkit-box",
        "height": "19px",
        "-webkit-line-clamp": 2,
        "overflow": "hidden"
    });

    $(".thirdPartyCallToActionClass").css({
        "font-family": "sans-serif",
        "font-weight": "600",
        "margin-top": "5px"
    });
};