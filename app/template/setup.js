playtemEmbedded.Template.prototype.setup = function() {
    var self = this;

    self.executeTemplateScript();

    if(self.settings.hasReward == true) {
        var rewarder = new playtemEmbedded.Reward({
            apiKey: self.settings.apiKey
        });

        rewarder.execute(function(error, result) {

        });
    }
};