playtemEmbeddedApp.TagProviderChain.Core.Date = {
    getCurrentTimestamp = function() {
        return $.now();
    },

    getUnixCurrentTime = function(date1) {
        return date1.getTime() / 1000 | 0;
    }
}