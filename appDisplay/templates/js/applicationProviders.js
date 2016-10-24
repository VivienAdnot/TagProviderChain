var empty = [];

//var allProvidersInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Affiz, playtemEmbedded.Actiplay];
var allProvidersInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];

var iscoolsInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var instreamTest = [playtemEmbedded.Actiplay];

var allProvidersOutstream = [playtemEmbedded.SpotxOutstream, playtemEmbedded.Smartad];

var providers = {
    rewarded: {
        //ludokado
        "4a2b-8438v": allProvidersInstream,

        //belote
        "4da9-acb2b": iscoolsInstream,

        //isCool
        "452c-8a80i": iscoolsInstream,

        //urbanRivals
        "494f-8f1bv": allProvidersInstream,

        //jotu
        "4c3f-be78j": allProvidersInstream,

        //ladyPopular
        "r47c7-9c9b": allProvidersInstream,
        "TSTr7-9c9b": instreamTest,

        "XXXX-xxxxx": [playtemEmbedded.Adreels]
    },

    outstream: {
        //jotu
        "1c27-4684v": allProvidersOutstream,

        //ludokado
        "9a19-43fav": allProvidersOutstream,

        //mediastay
        "e048-4cdev": allProvidersOutstream,

        //actiplayNoReward
        "4f63-b20df": allProvidersOutstream,

        //ladypopular
        "92c6-497ff": allProvidersOutstream,        
    }
}

var providersRewarded = {
    ludokado: {
        prod: allProvidersInstream,
        test: empty
    },

    belote: {
        prod: iscoolsInstream,
        test: empty
    },

    isCool: {
        prod: iscoolsInstream,
        test: empty
    },

    urbanRivals: {
        prod: allProvidersInstream,
        test: [playtemEmbedded.Actiplay]
    },

    jotu: {
        prod: [playtemEmbedded.Adreels],
        test: empty
    },

    ladyPopular: {
        prod: allProvidersInstream,
        test: [playtemEmbedded.Actiplay]
    },
};

var providersOutstream = {
    jotu: {
        prod: allProvidersOutstream,
        test: empty
    },

    ludokado: {
        prod: allProvidersOutstream,
        test: empty
    },

    ladyPopular: {
        prod: allProvidersOutstream,
        test: empty
    },

    mediastay: {
        prod: allProvidersOutstream,
        test: empty
    },

    actiplayNoReward: {
        prod: allProvidersOutstream,
        test: empty
    }
};