const urlStarts = [
    "https://elearning.hslu.ch/ilias/",
    "http://localhost:",
    "https://dxstiny.github.io/"
];

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;

        for (const urlStart of urlStarts) {
            if (url.startsWith(urlStart)) {
                chrome.action.setPopup({ popup: "ilias.html" });
                return;
            }
        }

        chrome.action.setPopup({ popup: "default.html" });
    });
});
