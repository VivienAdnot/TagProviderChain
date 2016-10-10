playtemEmbedded.PlaytemVideoPlayer = function(options) {
    var defaults = {
        debug: false,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    this.settings = {
        playerId: 'radiantVideoPlayer',
        scriptUrl: '//cdn.radiantmediatechs.com/rmp/3.0.8/js/rmp.min.js',
        radiantMediaPlayerSettings: {
            width: 500,
            height: 300,
            adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=",
            // adTagUrl: "http://ioms.bfmio.com/getBFMT?aid=2917925b-1c24-48f0-b9e4-ecde1008c481&i_type=test&v=1&mf=f&cb=0",
            // adTagWaterfall: [
            //     'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
            // ],
            licenseKey: 'Kl8lZ2V5MmdjPTY3dmkyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
            delayToFade: 0,
            bitrates: { mp4:[['Start','outstream']] },
            flashFallBack: false,
            autoplay: true,
            ads: true,
            adOutStream: true,
            hideControls: false,
            hideSeekBar: true,
            hideFullscreen: true,
            hideCentralPlayButton: false
        },
        $targetContainerElement: $('.ad'),
        cssProperties: {
            "position": "absolute",
            "top": "179px",
            "left": "125px",
            "width": "450px",
            "margin": "0 auto",
            "text-align": "center"
        }
    };

    this.defaults = $.extend(defaults, options);
    this.settings = $.extend(this.settings, defaults);       
};