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
        timeout: "Timeout", // do not change the case !
        inVideo: "onAdError"
    },
    $closeImgElement: $(".js-closeAd"),
    vastProviderNames : ["Actiplay", "SmartadVastRewarded", "CitroenOutstream", "CitroenInstream"]    
};