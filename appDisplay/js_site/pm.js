var iframe = null;

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
        case "playtem:tagApp:adAvailable":
            iframe.style.visibility = "visible";
            console.log("adAvailable");
            break;
        case "playtem:tagApp:adUnavailable":
            console.log("adUnavailable");
            break;        
        case "playtem:tagApp:userId":
            onUserId();
            break;
        case "closeAdWindow":
            iframe.style.visibility = "hidden";
            break;
        default: break;
    }
};

listener.add("message", eventHandler);