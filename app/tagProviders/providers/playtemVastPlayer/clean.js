playtemEmbedded.PlaytemVastPlayer.prototype.clean = function() {
    var self = this;
    
    $("#" + self.settings.playerId).fadeOut(500, function() {
        $(this).remove();
    });
}