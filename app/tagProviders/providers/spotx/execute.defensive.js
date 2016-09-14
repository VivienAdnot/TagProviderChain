// playtemEmbedded.Spotx.prototype.execute = function(callback) {
//     var self = this;
    
//     var onAdAvailableCalled = false;
//     var onAdUnavailableCalled = false;
//     var onVideoCompleteCalled = false;

//     //custom
//     var detectOnAdStarted = function() {
//         self.timeouts.videoAvailability.instance = window.setTimeout(function () {
//             window.clearInterval(self.poll);
//             onAdUnavailable = playtemEmbedded.Core.Operations.noop;

//             self.settings.debug && console.log("timeout: player visible");
//             callback("Spotx timeout: video availability", null);
//             return;
//         }, self.timeouts.videoAvailability.duration);

//         self.poll = window.setInterval(function() {
//             // refresh every round
//             var $playerContainer = $("#" + self.settings.scriptOptions["spotx_content_container_id"]);
//             var isPlayerDefined = $playerContainer.length == 1;
//             var isPlayerVisible = $playerContainer.height() > 0;

//             if(isPlayerDefined && isPlayerVisible) {
//                 window.clearInterval(self.poll);
//                 window.clearTimeout(self.timeouts.videoAvailability.instance);
//                 self.settings.debug && console.log("player visible");

//                 //todo onceProxy;
//                 if(onAdAvailableCalled == false) {
//                     onAdAvailableCalled = true;
//                     onAdAvailable();
//                 } else {
//                     playtemEmbedded.Core.log("spotx", "attempted to call onAdAvailable more than once");
//                 }
//             }
            
//         }, 200);
//     };

//     //custom
//     // todo don't name it here, do it in settings and do window[settings_method_name] = function()
//     window.spotXCallback = function(videoStatus) {
//         if (typeof videoStatus != "boolean") {
//             callback("Spotx exception: spotXCallback bad parameter videoStatus: " + videoStatus, null);
//             return;
//         }

//         if(videoStatus === true) {
//             self.settings.debug && console.log("spotXCallback: video completion");

//             if(onVideoCompleteCalled == false) {
//                 onVideoComplete();
//                 onVideoCompleteCalled = true;
//             } else {
//                 // do not log, allowedbehaviour if the player pauses the player
//                 //playtemEmbedded.Core.log("spotx", "attempted to call onVideoComplete more than once");
//             }

            
//         } else {
//             self.settings.debug && console.log("spotXCallback: onAdUnavailable");
//             if(onAdUnavailableCalled == false) {
//                 onAdUnavailable();
//                 onAdUnavailableCalled = true;
//             } else {
//                 playtemEmbedded.Core.log("spotx", "attempted to call onAdUnavailable more than once");
//             }
//         }
//     };

//     var onAdAvailable = function() {
//         self.timeouts.videoCompletion.instance = window.setTimeout(function () {
//             self.windowBlocker.clearBlocker();
//             self.settings.debug && console.log("timeout: video completion");
//         }, self.timeouts.videoCompletion.duration);

//         playtemEmbedded.Core.createTracker("spotx", "onAdAvailable");

//         self.windowBlocker.setBlocker();

//         onAdUnavailable = playtemEmbedded.Core.Operations.noop;

//         self.settings.debug && console.log("onAdAvailable");
//         callback(null, "success");
//     };

//     var onAdUnavailable = function() {
//         window.clearTimeout(self.timeouts.videoAvailability.instance);
//         window.clearInterval(self.poll);
//         playtemEmbedded.Core.createTracker("spotx", "onAdUnavailable");

//         onAdAvailable = playtemEmbedded.Core.Operations.noop;

//         self.settings.debug && console.log("onAdUnavailable");
//         callback("Spotx: no ad", null);
//     };

//     var onVideoComplete = function() {
//         window.clearTimeout(self.timeouts.videoCompletion.instance);
//         playtemEmbedded.Core.createTracker("spotx", "onVideoComplete");

//         self.windowBlocker.clearBlocker();
//         self.settings.debug && console.log("onVideoComplete");
//     };

//     var createTarget = function() {
//         var node =
//         "<div class='playerWrapper'>" +
//             "<div id='" + self.settings.scriptOptions["spotx_content_container_id"] + "'></div>" +
//         "</div>";

//         self.settings.$targetContainerElement.append(node);

//         $(".playerWrapper").css(self.settings.cssProperties);
//     };

//     createTarget();

//     // inject script

//     var onScriptLoaded = function() {
//         self.settings.debug && console.log("onScriptLoaded");
//         playtemEmbedded.Core.createTracker("spotx", "request");
//         detectOnAdStarted();
//     };

//     var onScriptInjectionError = function(errorMessage) {
//         window.clearTimeout(self.timeouts.scriptInjected.instance);
//         callback("Spotx exception onScriptInjectionError: " + errorMessage, null);
//     };

//     try {
//         var script = document.createElement("script");
//         script.async = true;
//         script.src = self.settings.scriptUrl;

//         // var toDashed = function(name) {
//         //     return name.replace(/([A-Z])/g, function(u) {
//         //         return "-" + u.toLowerCase();
//         //     });
//         // };

//         for(var key in self.settings.scriptOptions) {
//             if(self.settings.scriptOptions.hasOwnProperty(key)) {
//                 script.setAttribute('data-' + key, self.settings.scriptOptions[key]);
//             }
//         }

//         script.onload = function () {
//             window.clearTimeout(self.timeouts.scriptInjected.instance);
//             onScriptLoaded();
//         };

//         // onload equivalent for IE
//         script.onreadystatechange = function () {
//             if (this.readyState === "complete") {
//                 script.onload();
//             }
//         };

//         script.onerror = function () {
//             onScriptInjectionError("inject script error");
//         };        

//         self.timeouts.scriptInjected.instance = window.setTimeout(function () {
//             onScriptInjectionError("timeout");
//             onScriptLoaded = playtemEmbedded.Core.Operations.noop;
//             window.spotXCallback = playtemEmbedded.Core.Operations.noop;
//         }, self.timeouts.scriptInjected.duration);

//         document.getElementsByTagName("body")[0].appendChild(script);
//     } catch(e) {
//         onScriptInjectionError("catch: " + e);
//         return;
//     }
// };