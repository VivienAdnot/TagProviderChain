playtemEmbedded.Template.prototype.setup = function() {
    var self = this;

    self.executeTemplateScript();

    if(self.settings.hasReward == true) {
        var rewarder = new playtemEmbedded.Reward();

        rewarder.execute(function(error, result) {
            /*console.log("rewarder status");
            console.log(error);
            console.log(result);*/
        });
    }
};