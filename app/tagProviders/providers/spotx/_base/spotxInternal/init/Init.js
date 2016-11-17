playtemEmbedded.SpotxInternal.prototype.init = function() {
    var self = this;
    var deferred = $.Deferred();

    var createTarget = function() {
        var node =
            "<div class='playerWrapper'>" +
                "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
            "</div>";

        self.settings.$targetContainerElement.append(node);

        $(".playerWrapper").css(self.settings.cssProperties);
    };

    createTarget();

    self.injectScriptCustom(deferred);

    return deferred.promise();
};