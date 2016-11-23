var getBody = function () {
    return document.getElementsByTagName("body")[0];
};

var populateApiKeyList = function () {
    for (var item in listApikey) {
        var option = document.createElement("option");
        option.text = item;
        option.value = listApikey[item];
        document.getElementById("apiKey").add(option);
    }
};

var createHiddenIframe = function(apiKey) {
    var url = '/dist/templates/' + apiKey + '.html';
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

var display = function () {
    var apiKey = document.getElementById("apiKey").value;
    createHiddenIframe(apiKey);
};

populateApiKeyList();
$('#apiKey').select2();