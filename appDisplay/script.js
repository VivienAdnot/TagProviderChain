var iframe = null;

var getBody = function () {
    return document.getElementsByTagName("body")[0];
};

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
            //$("#adAvailable").text("onAdAvailable fired");
            //$(".iframe").show();
            iframe.style.visibility = "visible";
            console.log("adAvailable");
            break;
        case "playtem:tagApp:adUnavailable":
            //$("#adUnavailable").text("adUnavailable fired");
            console.log("adUnavailable");
            
            break;        
        case "playtem:tagApp:userId":
            onUserId();
            break;
        case "closeAdWindow":
            //$(".iframe").remove();
            iframe.style.visibility = "hidden";
            break;
        default: break;
    }
};

listener.add("message", eventHandler);

var createHiddenIframe = function(url) {
    iframe = document.createElement("iframe");
    
    iframe.id = 'iframe';
    iframe.class = 'iframe-desktop';
    iframe.src = url;
    
    // position
    iframe.style.width = "755px";
    iframe.style.height = "555px";
    
    // IE
    iframe.scrolling = "no";
    iframe.frameBorder = "0";

    // HTML 5
    iframe.style.overflow = "hidden";
    iframe.style.visibility = "hidden";

    getBody().appendChild(iframe);
};

var spotxBtn = document.getElementById("spotx");
spotxBtn.addEventListener('click', function() {
    createHiddenIframe('templates/b9de-4f25v.html');
});

/*$("#spotx").one("click", function() {
    $("body").append("<iframe class='iframeXXX iframeXXX-desktop u-hidden' src='templates/b9de-4f25v.html'></iframe>");
});

$("#affiztest").one("click", function() {
    $("body").append("<iframe class='iframeXXX iframeXXX-desktop u-hidden' src='templates/TSTb-8438v.html'></iframe>");
});

$("#affizprod").one("click", function() {
    $("body").append("<iframe class='iframeXXX iframeXXX-desktop u-hidden' src='templates/4a2b-8438v.html'></iframe>");
});

$("#smartad").one("click", function() {
    $("body").append("<iframe class='iframeXXX iframeXXX-desktop u-hidden' src='templates/TST9-43fav.html'></iframe>");
});*/