document.getElementById("test").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function parse() {
            const question = document.getElementById("ilc_Page");
            const questionTitle = question.querySelector("h1").innerText;
            const questionText = question.querySelector(
                ".ilc_qtitle_Title p"
            ).innerText;
            const answers = [...question.querySelectorAll("label")].map(
                (label) => label.innerText
            );

            console.log(questionTitle);
            console.log(questionText);
            console.log(answers);
        }

        chrome.scripting
            .executeScript({
                target: { tabId: tab.id },
                func: parse
            })
            .then(() => console.log("Injected a function!"));
    });
});
