playtemEmbedded.Core.logError = function (tag, message) {
    var url = "//ariane.playtem.com/Browser/Error";
    var logPrefix = "playtemEmbedded - " + tag ? tag + ": " : "";
    var formattedMessage = logPrefix + message.toString();
    jQuery.post(url, { message: formattedMessage });
};

playtemEmbedded.Core.logInfo = function (tag, message) {
    var url = "//ariane.playtem.com/Browser/Event";
    var logPrefix = "playtemEmbedded - " + tag ? tag + ": " : "";
    var formattedMessage = logPrefix + message.toString();
    jQuery.post(url, { message: formattedMessage });
};