playtemEmbedded.Core.VideoPlayerStateMachine = function() {
    this.states = {
        none: "none",
        adAvailable: "adAvailable",
        adUnavailable: "adUnavailable",
        adComplete: "adComplete",
        adError: "adError"
    };

    this.state = this.states.none;

    this.stateManager = {
        none: null,
        adAvailable: "none",
        adUnavailable: "none",
        adComplete: "adAvailable"
    };
};