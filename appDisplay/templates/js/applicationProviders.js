var empty = [];

var allProvidersInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.Affiz];

// var iscoolsInstream = [playtemEmbedded.SpotxInstream, playtemEmbedded.PlaytemVastWrapper];
//var iscoolsInstream = [playtemEmbedded.PlaytemVastWrapper];

var instreamTest = [playtemEmbedded.Affiz];
var allProvidersOutstream = [playtemEmbedded.Smartad, playtemEmbedded.SpotxOutstream];

// vast tag test

var providers = {
    rewarded: {
        //===== prod =====

        //ludokado
        "4a2b-8438v": [playtemEmbedded.PlaytemVastActiplay],

        //belote
        "4da9-acb2b": [playtemEmbedded.PlaytemVastVexigoInstream],

        //isCool
        "452c-8a80i": [playtemEmbedded.PlaytemVastActiplay],

        //urbanRivals
        "494f-8f1bv": [playtemEmbedded.PlaytemVastVexigoInstream],

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
        "4f63-b20df": [playtemEmbedded.PlaytemVastVexigoOutstream],

        //ladypopular
        "92c6-497ff": allProvidersOutstream,

        //===== ! prod =====

        //ludokado
        "9a19-43fav": allProvidersOutstream,        
        
        //TLM
        "ad5d-4ef0f": allProvidersOutstream
    },

    test: {
        "XXXX-xxxxx": [playtemEmbedded.RevContent]
    }
};