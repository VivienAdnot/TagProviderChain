playtemEmbedded.AppSettings = {
    placementTypes: {
        outstream: "outstream",
        rewarded: "rewarded"
    },
    providerTimeout: 10000,
    IframeManagerEvents: {
        onAdAvailable: "playtem:tagApp:adAvailable",
        onAdUnavailable: "playtem:tagApp:adUnavailable",
        defaultEnd: "playtem:tagApp:defaultEnd"
    },
    providerErrorTypes: {
        internal: "internalError",
        timeout: "timeout",
        inVideo: "onAdError"
    },
    $closeImgElement: $(".js-closeAd")
};