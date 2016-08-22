playtemEmbedded.Smartad.prototype.render = function() {
    var self = this;
    
    var divId = "sas_" + self.settings.formatId;
    $(self.settings.target).attr("id", divId);

    sas.render(self.settings.formatId);
};
