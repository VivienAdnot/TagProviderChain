var isCoolGamesProfile = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var empty = [];

var providersRewarded = {
    Ludokado: {
        prod: [playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream],
        test: empty
    },

    Belote: {
        prod: isCoolGamesProfile,
        test: empty
    },

    IsCool: {
        prod: isCoolGamesProfile,
        test: empty
    },

    UrbanRivals: {
        prod: empty,
        test: [playtemEmbedded.Affiz]
    },

    Jotu: {
        prod: empty,
        test: [playtemEmbedded.Adreels]
    }
};

var providersOutstream = {
    Ludokado: {
        prod: [playtemEmbedded.Smartad],
        test: empty
    },

    Jotu: {
        prod: [playtemEmbedded.SpotxOutstream],
        test: empty
    }
};