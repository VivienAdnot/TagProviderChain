var empty = [];

var allProvidersInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.PlaytemVastActiplay, playtemEmbedded.Affiz];
var iscoolsInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.PlaytemVastActiplay];

var allProvidersOutstream = [playtemEmbedded.SpotxOutstream, playtemEmbedded.Smartad, playtemEmbedded.RevContent];

var instreamTest = [playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream];

var providers = {
    rewarded: {
        //===== prod =====

        //ludokado
        "4a2b-8438v": allProvidersInstream,

        //urbanRivals
        "494f-8f1bv": allProvidersInstream,        

        //belote
        "4da9-acb2b": iscoolsInstream,

        //isCool
        "452c-8a80i": iscoolsInstream,

        //===== ! prod =====

        //jotu
        "4c3f-be78j": allProvidersInstream,

        //ladyPopular
        "r47c7-9c9b": allProvidersInstream,
        "TSTr7-9c9b": instreamTest,

        //mediastay rewarded
        "r4b75-8a76": allProvidersInstream,
        "TSTr5-8a76": instreamTest
    },

    outstream: {
        //===== prod =====

        //jotu
        "1c27-4684v": allProvidersOutstream,

        //mediastay
        "e048-4cdev": allProvidersOutstream,

        //actiplayNoReward
        "4f63-b20df": allProvidersOutstream,

        //ladypopular
        "92c6-497ff": allProvidersOutstream,

        //Ma Bimbo
        "1206-4ce9f": allProvidersOutstream,

        //Voyage to Fantasy
        "9a56-4422f": allProvidersOutstream,

        //Equideow
        "ff3d-4b8cf": allProvidersOutstream,
        
        //Prizee
        "Fj68VbKzEe": allProvidersOutstream,

        //FairyMix
        "Hn78Uf8iRy": allProvidersOutstream,

        //ludokado
        "9a19-43fav": [playtemEmbedded.Smartad],

        //===== ! prod =====
        
        //TLM
        "ad5d-4ef0f": allProvidersOutstream
    },

    test: {
        "XXXX-xxxxx": instreamTest
    }
};