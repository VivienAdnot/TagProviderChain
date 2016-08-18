playtemApp.Main.TagProviders.prototype.notify = function (fetchAdvertStatus) {
    var self = this;

    if(fetchAdvertStatus == true) {
        window.parent.postMessage("playtem:smartad:adAvailable", "*");
    } else {
        window.parent.postMessage("playtem:smartad:adUnavailable", "*");
    }
};