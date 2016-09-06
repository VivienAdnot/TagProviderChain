var listener = {
    add: function (eventName, callback) {
        if (window.addEventListener) {
            window.addEventListener(eventName, callback, false);
        } else if(window.attachEvent){
            // IE < 9
            window.attachEvent('on' + eventName, callback);
        } else {
            window['on' + eventName] = callback;
        }
    },

    remove: function (eventName, callback) {
        if (window.removeEventListener) {
            window.removeEventListener(eventName, callback);
        } else if(window.detachEvent){
            // IE < 9
            window.detachEvent('on' + eventName, callback);
        } else{
            window['on' + eventName] = null;
        }
    }
};

var eventHandler = function (postMessageEvent) {
    // drop invalid messages    
    if(!postMessageEvent || !postMessageEvent.data) {
        return;
    }

    var onUserId = function() {
        var userId = "playtem:js:1234";
        postMessageEvent.source.postMessage(userId, postMessageEvent.origin);
    };
    
    switch (postMessageEvent.data) {
        case "playtem:smartad:userId":
            onUserId();
            break;
        default: break;
    }
};

listener.add("message", eventHandler);

$("#ludokado-prod").one("click", function() {
    $("body").append("<iframe class='iframe iframe-desktop' src='prod/TST9-43fav.html'></iframe>");
});

$("#jewel-prod").one("click", function() {
    $("body").append("<iframe class='iframe iframe-mobile' src='prod/TSTc-9467v.html'></iframe>");
});

$("#ludokado-preprod").one("click", function() {
    $("body").append("<iframe class='iframe iframe-desktop' src='preprod/desktop-ludokado.html'></iframe>");
});

$("#jewel-preprod").one("click", function() {
    $("body").append("<iframe class='iframe iframe-mobile' src='preprod/webmobile-jewel.html'></iframe>");
});