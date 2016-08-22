playtemEmbedded.Smartad.prototype.destructor = function() {
    var self = this;
    $(self.settings.targetId).remove();
};