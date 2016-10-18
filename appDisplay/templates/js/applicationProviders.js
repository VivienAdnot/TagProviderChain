var isCoolGamesProfile = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var empty = [];

var providersRewarded = {
    ludokado: {
        prod: [playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream],
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
        prod: empty,
        test: [playtemEmbedded.Affiz]
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