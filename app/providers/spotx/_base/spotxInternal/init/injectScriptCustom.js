playtemEmbedded.SpotxInternal.prototype.injectScriptCustom = function(callback) {
    var self = this;

    var script = document.createElement("script");
    script.async = true;
    script.src = self.settings.scriptUrl;

    for(var key in self.settings.scriptOptions) {
        if(self.settings.scriptOptions.hasOwnProperty(key)) {
            script.setAttribute('data-' + key, self.settings.scriptOptions[key]);
        }
    }

    script.onload = function () {
        callback(null, "success");
    };

    // onload equivalent for IE
    script.onreadystatechange = function () {
        if (this.readyState === "complete") {
            script.onload();
        }
    };

    script.onerror = function () {
        callback("error while loading script", null);
    };

    try {
        document.getElementsByTagName("body")[0].appendChild(script);
    } catch(e) {
        callback("body.appendChild exception: " + e, null);
    }
};