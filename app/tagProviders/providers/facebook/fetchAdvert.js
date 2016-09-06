playtemEmbedded.Facebook.prototype.fetchAdvert = function(callback) {
    var self = this;
    var timeoutFired = false;

    window.fbAsyncInit = function() {
        FB.Event.subscribe(
            'ad.loaded',
            function(placementId) {
                if(!timeoutFired) {
                    window.clearTimeout(self.timeoutTimer);
                    playtemEmbedded.Core.createTracker("Facebook", "success");

                    callback(null, "success");
                }
            }
        );
        FB.Event.subscribe(
            'ad.error',
            function(errorCode, errorMessage, placementId) {
                if(!timeoutFired) {
                    window.clearTimeout(self.timeoutTimer);
                    playtemEmbedded.Core.createTracker("Facebook", "passback");

                    var error = 'Facebook error (' + errorCode + ') : ' + errorMessage;
                    callback(error, null);
                }
            }
        );
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk/xfbml.ad.js#xfbml=1&version=v2.5&appId=992123530865458";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    self.timeoutTimer = window.setTimeout(function () {
        timeoutFired = true;
        playtemEmbedded.Core.createTracker("Facebook", "timeout");

        callback("Facebook: timeout", null);
    }, self.settings.httpRequestTimeout);
};