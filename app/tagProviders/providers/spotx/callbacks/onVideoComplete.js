playtemEmbedded.Spotx.prototype.onVideoComplete = function() {
    var self = this;
    
    playtemEmbedded.Core.track("spotx", "onVideoComplete", function() {
        self.settings.onAdComplete();
    });      
};