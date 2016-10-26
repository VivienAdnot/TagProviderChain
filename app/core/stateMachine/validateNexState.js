playtemEmbedded.Core.VideoPlayerStateMachine.prototype.validateNexState = function(nexState, callback) {
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