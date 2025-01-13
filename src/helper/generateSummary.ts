import type { ICourse } from "@/course";

export const generateMarkdownSummary = (course: ICourse) => {
    let text = `# ${course.title}
`;

    text += generateSummary(course, {
        insertHeading: (title) => `## ${title}\n`,
        insertDescription: (description) => `${description}\n`,
        insertList: (items) => items.map((i) => `- ${i}`).join("\n") + "\n",
        insertMap: (items) =>
            Object.entries(items)
                .map(([key, value]) => `- ${key} -> ${value}`)
                .join("\n") + "\n",
        insertText: (text) => `${text}\n`
    });

    return text;
};

export const generateLatexSummary = (course: ICourse) => {
    let text = `\\documentclass{article}

\\usepackage{csquotes}
\\usepackage[T1]{fontenc}

\\raggedright

\\title{${course.title}}
\\author{Generated by QuizMe}
\\date{\\today}

\\begin{document}

\\maketitle
`;

    const escapeText = (text: string) =>
        text
            .replace(/\\/g, "\\textbackslash{}")
            .replace(/\{/g, "\\{")
            .replace(/\}/g, "\\}")
            .replace(/&/g, "\\&")
            .replace(/%/g, "\\%")
            .replace(/\$/g, "\\$")
            .replace(/#/g, "\\#")
            .replace(/"([^"]*)"/g, "\\enquote{$1}");

    text += generateSummary(course, {
        insertHeading: (title) => `\\section{${escapeText(title)}}\n`,
        insertDescription: (description) => `${escapeText(description)}\n`,
        insertList: (items) => `\\begin{itemize}
${items.map((i) => `\\item ${escapeText(i)}`).join("\n")}
\\end{itemize}
`,
        insertMap: (items) => `\\begin{itemize}
${Object.entries(items)
    .map(
        ([key, value]) =>
            `\\item ${escapeText(key)} \\textrightarrow ${escapeText(value)}`
    )
    .join("\n")}
\\end{itemize}
`,
        insertText: (text) => `${escapeText(text)}\n`
    });

    text += `
\\end{document}
`;

    return itemiseAllLists(text);
};

const generateSummary = (
    course: ICourse,
    generators: {
        insertHeading: (title: string) => string;
        insertDescription: (description: string) => string;
        insertList: (items: string[]) => string;
        insertMap: (items: Record<string, string>) => string;
        insertText: (text: string) => string;
    }
) => {
    let out = "";

    for (const question of course.questions) {
        if (question.type === "true-false" && !question.solution) {
            continue;
        }

        out += generators.insertHeading(question.title);
        out += generators.insertDescription(question.question);

        switch (question.type) {
            case "multiple-answer":
                out += generators.insertList(
                    question.solution.map((i) => question.options[i])
                );
                break;
            case "multiple-choice":
                out += generators.insertText(
                    question.options[question.solution]
                );
                break;
            case "ordering":
                out += generators.insertList(question.solution);
                break;
            case "true-false":
                break;
            case "fill-in-the-blank":
                out += question.solution;
                break;
            case "matching":
                out += generators.insertMap(question.solution);
                break;

            default:
                out += generators.insertText(String(question.solution));
                break;
        }
    }

    return out;
};

const itemiseAllLists = (content: string) => {
    // Step 1: Split the input into lines
    const lines = content.split("\n");

    let listLevel = 0; // Current level of nesting
    const result = []; // Array to hold the output lines

    // Step 2: Process each line
    for (const line of lines) {
        let trimmedLine = line.trim();

        if (
            trimmedLine.startsWith("\\item -") ||
            trimmedLine.startsWith("\\item *")
        ) {
            if (listLevel === 0) {
                result.push("\\begin{itemize}");
                listLevel++;
            }
            trimmedLine = trimmedLine.replace(/\\item [-*]/, "-").trim();
            console.log(trimmedLine);
        }

        if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*")) {
            // We are in a list
            // If this is the start of a new list, add \begin{itemize}
            if (listLevel === 0) {
                result.push("\\begin{itemize}");
                listLevel++;
            }
            // Convert the list item to LaTeX format
            const itemContent = trimmedLine.replace(/^-/, "").trim();
            result.push(`  \\item ${itemContent}`);
        } else {
            // If we encounter a non-list line and were in a list

            for (let i = 0; i < listLevel; i++) {
                result.push("\\end{itemize}");
            }

            listLevel = 0;
            // Add the non-list line as is
            result.push(line);
        }
    }

    // If the input ends while still in a list, close the itemize block
    for (let i = 0; i < listLevel; i++) {
        result.push("\\end{itemize}");
    }

    // Step 3: Join the output lines back into a single string
    return result.join("\n");
};
