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

$("#spotx").one("click", function() {
    $("body").append("<iframe class='iframe iframe-desktop' src='templates/b9de-4f25v.html'></iframe>");
});

$("#affiz").one("click", function() {
    $("body").append("<iframe class='iframe iframe-desktop' src='templates/TSTb-8438v.html'></iframe>");
});