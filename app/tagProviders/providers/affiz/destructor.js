playtemEmbedded.Affiz.prototype.destructor = function(callback) {
    var self = this;

    window.avAsyncInit = undefined;
    window.clearTimeout(self.timeoutTimer);
};