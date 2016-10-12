playtemEmbedded.PlaytemVastPlayer = function(options) {
    var defaults = {
        debug: false,

        onAdAvailable: $.noop,
        onAdUnavailable: $.noop,
        onAdComplete: $.noop,
        onError: $.noop
    };

    var tagTestGoogle = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=";
    var tagActiplayProd = "https://pubads.g.doubleclick.net/gampad/ads?sz=450x400&iu=/1163333/EXT_Playtem_InGame_Preroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=&description_url=&correlator=[timestamp]";

    var licenseKeys = {
        "static.playtem.com": 'Kl8lMDc9N3N5MmdjPTY3dmkyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg=='
    };

    var adTagUrl = (options.debug === true) ? tagTestGoogle : tagActiplayProd;

    this.settings = {
        playerId: 'radiantVideoPlayer',
        scriptUrl: '//cdn.radiantmediatechs.com/rmp/3.0.8/js/rmp.min.js',
        radiantMediaPlayerSettings: {
            adTagUrl: adTagUrl,
            licenseKey: licenseKeys["static.playtem.com"],

            width: 500,
            height: 300,
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

            // adTagWaterfall: [
            //     'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
            // ],            
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
    
    this.settings.radiantMediaPlayerSettings.adTagUrl += playtemEmbedded.Core.Date.getCurrentTimestamp();
};