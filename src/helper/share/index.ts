import type { ICourse } from "@/course";
import gistClient from "@/helper/gistClient";
import { gistShare } from "./gist";

interface IImportResult {
    author?: string;
    course?: ICourse;
    link?: string;
    error?: "not-found" | "not-allowed";
}

interface IImportSuccess extends IImportResult {
    author: string;
    course: ICourse;
    link: string;
}

interface IImportError extends IImportResult {
    error: "not-found" | "not-allowed";
}

export type Import = IImportSuccess | IImportError;

export const toShare = (mode: "gist", author: string, tag: string) => {
    const gistUrl = `${mode}:${author}:${tag}`;
    const base64 = btoa(gistUrl);
    return {
        link: `https://dxstiny.github.io/quizme/#/s/${base64}`,
        identifier: base64
    };
};

export const fromShare = (identifier: string) => {
    const str = atob(identifier);
    const [mode, author, ...data] = str.split(":");

    return {
        mode,
        author,
        tag: data.join(":")
    };
};

export const push = async (course: ICourse, isPublic: boolean = false) => {
    return await gistShare.push(course, isPublic);
};

export const pull = async (identifier: string) => {
    const { mode } = fromShare(identifier);
    if (mode === "gist") {
        return await gistShare.pull(identifier);
    }
    return { error: "not-found" } as Import;
};
