playtemEmbedded.RevContent.prototype.init = function(callback) {
    var self = this;

    var createTarget = function(callback) {
        self.settings.$targetContainerElement.append("<div id='revcontent'></div>");
        $("#revcontent").css({
            position: "absolute",
            top: 200,
            left: "0",
            right: "0",
            margin: "auto",
            width: 500,
            "text-align": "center"            
        });
    };

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

    createTarget();    

    var rcel = document.createElement("script");
    rcel.id = 'rc_' + Math.floor(Math.random() * 1000);
    rcel.type = 'text/javascript';
    rcel.src = "//trends.revcontent.com/serve.js.php?"
        + "w=50804"
        + "&t=" + rcel.id
        + "&c=" + (new Date()).getTime()
        + "&width=500"
        + "&referer=" + getReferrer();

    rcel.async = true;

    rcel.onload = function () {
        callback(true);
    };

    // onload equivalent for IE
    rcel.onreadystatechange = function () {
        if (this.readyState === "complete") {
            rcel.onload();
        }
    };

    rcel.onerror = function () {
        callback(false);
    };

    var rcds = document.getElementById("revcontent");
    rcds.appendChild(rcel);
};