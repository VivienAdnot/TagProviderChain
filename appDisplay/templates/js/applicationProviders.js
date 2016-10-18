var isCoolGamesProfile = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var empty = [];

var providersRewarded = {
    ludokado: {
        prod: [playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay],
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
        prod: [playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay],
        test: empty
    },

    jotu: {
        prod: empty,
        test: [playtemEmbedded.Actiplay]
    }
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