playtemEmbedded.SpotxInternal.prototype.injectScriptCustom = function(deferred) {
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
        deferred.resolve();
    };

    // onload equivalent for IE
    script.onreadystatechange = function () {
        if (this.readyState === "complete") {
            script.onload();
        }
    };

    script.onerror = function () {
        deferred.reject();
    };

    try {
        document.getElementsByTagName("body")[0].appendChild(script);
    } catch(e) {
        deferred.reject();
    }
};