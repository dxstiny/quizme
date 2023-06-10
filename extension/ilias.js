chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    document.querySelector("#action").innerText = tab.url.startsWith(
        "http://localhost:"
    )
        ? "Save"
        : "Export";
});

document.getElementById("action").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        const parse = async () => {
            const getOptions = (el) => {
                return [...el.querySelectorAll("label")].map(
                    (label) => label.innerText
                );
            };

            const getMultipleChoice = (el) => {
                return {
                    type: "multiple-choice",
                    options: getOptions(el),
                    solution: -1
                };
            };

            const getMultipleAnswer = (el) => {
                return {
                    type: "multiple-answer",
                    options: getOptions(el),
                    solution: []
                };
            };

            const createQuestion = (el) => {
                if (!el) return null;
                const title = el.querySelector("h1").innerText;
                if (!title) return null;
                const questionText = el.querySelector(
                    ".ilc_qtitle_Title p"
                ).innerText;
                if (!questionText) return null;

                const toParse = el.querySelector(".ilc_question_Standard div");
                const type = toParse.classList[0];
                const parser = {
                    ilc_question_MultipleChoice: getMultipleAnswer,
                    ilc_question_SingleChoice: getMultipleChoice
                };

                if (!parser[type]) return null;

                const parsed = parser[type](toParse);

                return {
                    title,
                    question: questionText,
                    id: Math.random().toString(36).substring(7),
                    ...parsed
                };
            };

            const element = document.getElementById("ilc_Page");

            const question = createQuestion(element);

            if (!question) {
                console.error("Could not parse question");
                return;
            }

            const storage = await chrome.storage.local.get("questions");
            const questions = storage.questions || [];
            questions.push(question);
            await chrome.storage.local.set({ questions });
        };

        const save = async () => {
            const value = await chrome.storage.local.get("questions");
            window.localStorage.setItem(
                "quizme.import",
                JSON.stringify(value.questions)
            );
            await chrome.storage.local.set({ questions: [] });
        };

        if (tab.url.startsWith("http://localhost:")) {
            chrome.scripting
                .executeScript({
                    target: { tabId: tab.id },
                    func: save
                })
                .then(() => console.log("Injected a function!"));
            return;
        }

        chrome.scripting
            .executeScript({
                target: { tabId: tab.id },
                func: parse
            })
            .then(() => console.log("Injected a function!"));
    });
});
