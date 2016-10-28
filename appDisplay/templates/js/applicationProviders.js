var empty = [];

var allProvidersInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay, playtemEmbedded.Affiz];

var iscoolsInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Actiplay];
var instreamTest = [playtemEmbedded.Affiz];

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
        "TSTr7-9c9b": instreamTest
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
    },

    test: {
        "XXXX-xxxxx": [playtemEmbedded.Actiplay]
    }
};