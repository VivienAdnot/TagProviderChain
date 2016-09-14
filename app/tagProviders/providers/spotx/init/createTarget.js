playtemEmbedded.Spotx.prototype.createTarget = function(callback) {
    var self = this;
    
    var node =
        "<div class='playerWrapper'>" +
            "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
        "</div>";

    self.settings.$targetContainerElement.append(node);

    $(".playerWrapper").css(self.settings.cssProperties);
}