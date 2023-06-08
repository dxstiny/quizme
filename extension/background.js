chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;
        if (url.startsWith("https://elearning.hslu.ch/ilias/")) {
            chrome.action.setPopup({ popup: "ilias.html" });
        } else {
            chrome.action.setPopup({ popup: "default.html" });
        }
    });
});
