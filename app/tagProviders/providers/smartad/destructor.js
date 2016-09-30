playtemEmbedded.Smartad.prototype.destructor = function() {
    var self = this;
    if($(self.settings.targetClass).length > 0) {
        $(self.settings.targetClass).remove();
    }
};