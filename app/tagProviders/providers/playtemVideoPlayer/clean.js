playtemEmbedded.PlaytemVideoPlayer.prototype.clean = function() {
    var self = this;
    $("#" + self.settings.playerId).remove();
}