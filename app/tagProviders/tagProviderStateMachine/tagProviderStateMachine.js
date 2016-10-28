playtemEmbedded.Core.TagProviderStateMachine = function() {
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

playtemEmbedded.Core.TagProviderStateMachine.prototype.validateNextState = function(nexState) {
    var self = this;
    
    var stateExists = function() {
        return typeof self.states[nextState] == "string";
    };

    if(stateExists == false) {
        return false;
    }

    var allowedPreviousState = self.stateManager[nextState];

    var isNextStateAllowed = this.currentState === allowedPreviousState;

    if(isNextStateAllowed) {
        self.currentState = this.states[nextState];
        return true;
    } else {
        return false;
    }
};

playtemEmbedded.Core.TagProviderStateMachine.prototype.setState = function(nexState) {
    var self = this;
    self.state = self.states[nextState]; 
}