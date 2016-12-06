playtemEmbedded.WindowBlocker = function() {};

playtemEmbedded.WindowBlocker.prototype = {
    setBlocker : function() {
        playtemEmbedded.AppSettings.$closeImgElement.hide();
    },

    clearBlocker: function() {
        playtemEmbedded.AppSettings.$closeImgElement.fadeIn(500);
    }
};