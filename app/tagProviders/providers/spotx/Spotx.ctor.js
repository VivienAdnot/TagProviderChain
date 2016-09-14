playtemEmbedded.Spotx = function(options) {
    var defaults = {
        debug: false
    };

    this.settings = {
        scriptUrl: '//search.spotxchange.com/js/spotx.js',
        scriptOptions: {
            "spotx_channel_id" : "85394",
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

    this.windowBlocker = new playtemEmbedded.WindowBlocker();
    this.timeouts = {
        scriptInjected : {
            instance: null,
            duration: 1000
        },
        videoAvailability : {
            instance: null,
            duration: 4000
        },
        videoCompletion : {
            instance: null,
            duration: 30000
        }
    };

    this.poll = null;

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};