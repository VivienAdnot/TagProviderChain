playtemEmbedded.Spotx = function(options) {
    var siteIdTest = "85394";
    var siteIdProductionInstream = "147520";
    var siteIdProductionOutstream = "146222";

    var defaults = {
        debug: false,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        scriptUrl: '//search.spotxchange.com/js/spotx.js',
        scriptOptions: {
            "spotx_channel_id" : siteIdProductionOutstream,
            "spotx_ad_unit" : "incontent",
            "spotx_ad_done_function" : "spotXCallback",
            "spotx_content_width" : "450",
            "spotx_content_height" : "300", // 370 default
            "spotx_collapse" : "1",
            "spotx_ad_volume" : "0",
            "spotx_unmute_on_mouse" : "1",
            "spotx_autoplay" : "1",
            "spotx_ad_max_duration" : "500",
            "spotx_https" : "1",
            "spotx_content_container_id" : "spotx"
        },
        $targetContainerElement: $('.ad'),

        cssProperties: {
            "position": "absolute",
            "top": "179px",
            "left": "150px",
            "width": "450px",
            "margin": "0 auto",
            "text-align": "center"
        }
    };

    this.executeCallback = undefined;

    this.timeouts = {
        videoAvailability : {
            instance: null,
            duration: 10000
        }
    };

    this.poll = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);
    
    if(this.settings.debug === true) {
        this.settings.siteId = siteIdTest;
    }
};