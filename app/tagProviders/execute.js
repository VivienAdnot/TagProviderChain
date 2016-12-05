playtemEmbedded.TagProviders.prototype.execute = function () {
    var self = this;

    var placementProfile = null;

    switch(self.settings.placementType) {
        case playtemEmbedded.AppSettings.placementTypes.rewarded:
            placementProfile = self.getPlacementRewardedBehavior();
            break;

        case playtemEmbedded.AppSettings.placementTypes.outstream:
            placementProfile = self.getPlacementOutstreamBehavior();
            break;

        default:
            throw new Error("placementType must be one of these values: " + Object.values(playtemEmbedded.AppSettings.placementTypes).join());
    }

    self.fetchAdvert(placementProfile);
};