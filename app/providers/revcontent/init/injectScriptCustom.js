playtemEmbedded.RevContent.prototype.injectScriptCustom = function(callback) {
    var self = this;

    var getReferrer = function() {
        var thisReferrer = "";
        try {
            if (thisReferrer = document.referrer, "undefined" == typeof thisReferrer) throw "undefined";
        } catch (exception) {
            thisReferrer = document.location.href, ("" == thisReferrer || "undefined" == typeof thisReferrer) && (thisReferrer = document.URL)
        }
        thisReferrer = thisReferrer.substr(0, 700);
        return thisReferrer;
    };

    var scriptElement = document.createElement("script");

    scriptElement.id = 'rc_' + Math.floor(Math.random() * 1000);
    scriptElement.type = 'text/javascript';
    scriptElement.src = "//trends.revcontent.com/serve.js.php?"
        + "w=50811"
        + "&t=" + scriptElement.id
        + "&c=" + playtemEmbedded.Core.Date.getCurrentTimestamp()
        + "&width=400"
        + "&referer=" + getReferrer();

    scriptElement.async = true;

    scriptElement.onload = function () {
        callback(true);
    };

    // onload equivalent for IE
    scriptElement.onreadystatechange = function () {
        if (this.readyState === "complete") {
            scriptElement.onload();
        }
    };

    scriptElement.onerror = function () {
        callback(false);
    };

    var revcontentElement = document.getElementById("revcontent");
    revcontentElement.appendChild(scriptElement);
};