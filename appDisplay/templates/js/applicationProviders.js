var isCoolGamesProfile = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var empty = [];

var providersRewarded = {
    ludokado: {
        prod: [playtemEmbedded.SpotxInstream, playtemEmbedded.Affiz, playtemEmbedded.Actiplay],
        test: empty
    },

    belote: {
        prod: isCoolGamesProfile,
        test: empty
    },

    isCool: {
        prod: isCoolGamesProfile,
        test: empty
    },

    urbanRivals: {
        prod: [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay, playtemEmbedded.Affiz],
        test: [playtemEmbedded.Actiplay]
    },

    jotu: {
        prod: [playtemEmbedded.Adreels],
        test: empty
    },

    ladyPopular: {
        prod: [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay, playtemEmbedded.Affiz],
        test: [playtemEmbedded.Actiplay]
    },
};

var providersOutstream = {
    ludokado: {
        prod: [playtemEmbedded.SpotxOutstream, playtemEmbedded.Smartad],
        test: empty
    },

    jotu: {
        prod: [playtemEmbedded.SpotxOutstream, playtemEmbedded.Smartad],
        test: empty
    }
};