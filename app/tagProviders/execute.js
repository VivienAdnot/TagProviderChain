playtemEmbedded.TagProviders.prototype.execute = function () {
    var self = this;

    var placementProfile = (self.settings.blockWindow == true) ? self.getPlacementProfileRewarded() : self.getPlacementProfileClassic();

    self.fetchAdvert(placementProfile);
};