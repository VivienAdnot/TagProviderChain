playtemEmbeddedApp.TagProviderChain.Core.Date = {
    getCurrentTimestamp = function() {
        return $.now();
    },

    getUnixCurrentTimestampSeconds = function() {
        var referenceDate = new Date();

        var getUTCTimestampSeconds = function() {
            var utcTimestampMilliseconds = referenceDate.getTime();
            return Math.floor(utcTimestampMilliseconds  / 1000);
        };

        return getUTCTimestampSeconds();
    }
}