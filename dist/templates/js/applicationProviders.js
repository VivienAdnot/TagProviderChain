var instreamTest = [playtemEmbedded.SpotxTest];

var providers = {};

providers.test = {
    "XXXX-xxxxx": [playtemEmbedded.PlaytemVastTest]
};

//===========================
// INSTREAM
//===========================

var allProvidersInstream = [playtemEmbedded.PlaytemVastInstream, playtemEmbedded.Affiz, playtemEmbedded.SpotxInstream];
var iscoolsInstream = [playtemEmbedded.PlaytemVastInstream, playtemEmbedded.SpotxInstream];

providers.rewarded = {
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
    "TSTf-be78j": instreamTest,

    //ladyPopular
    "r47c7-9c9b": allProvidersInstream,
    "TSTr7-9c9b": instreamTest,

    //mediastay rewarded
    "r4b75-8a76": allProvidersInstream,
    "TSTr5-8a76": instreamTest,

    //Bingo-Video rewarded
    "r45da-bc19": allProvidersInstream,
    "TSTra-bc19": instreamTest
};

//===========================
// OUTSTREAM
//===========================

var allProvidersOutstream = [playtemEmbedded.SmartadMixedContent, playtemEmbedded.SpotxOutstream];

providers.outstream = {
    //===== prod =====

    //mediastay
    "e048-4cdev": allProvidersOutstream,

    //actiplayNoReward
    "4f63-b20df": allProvidersOutstream,

    //Voyage to Fantasy
    "9a56-4422f": allProvidersOutstream,
    
    //Prizee
    "Fj68VbKzEe": allProvidersOutstream,

    //FairyMix
    "Hn78Uf8iRy": allProvidersOutstream,

    //TLM
    "ad5d-4ef0f": allProvidersOutstream,

    //ladypopular
    "92c6-497ff": allProvidersOutstream,

    //Ma Bimbo
    "1206-4ce9f": allProvidersOutstream,

    //belote
    "a50f-4ffea": allProvidersOutstream,

    //iscool
    "12df-48691": allProvidersOutstream,

    // ==== providers exceptions =====

    //ludokado
    "9a19-43fav": [playtemEmbedded.SmartadMixedContent],

    //jotu
    "1c27-4684v": [playtemEmbedded.SmartadMixedContent, playtemEmbedded.PlaytemVastOutstream, playtemEmbedded.SpotxOutstream],

    //Equideow
    "ff3d-4b8cf": [playtemEmbedded.SmartadMixedContent, playtemEmbedded.PlaytemVastOutstream, playtemEmbedded.SpotxOutstream],    
};