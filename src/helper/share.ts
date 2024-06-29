import type { ICourse } from "@/course";
import gistClient from "@/helper/gistClient";

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

export const push = async (course: ICourse, asPublic: boolean = false) => {
    const name = `${course.title}.qm`;
    const jdata = await gistClient.save(
        { [name]: course },
        course.title,
        course.description,
        asPublic
    );
    const file = jdata.files[name];
    const rawUrl = file.raw_url;
    // "https://gist.githubusercontent.com/{user}/{gist}/raw/{file}/{filename}"
    // gist:{user}:{gist}:{filename}
    const gistId = jdata.id;
    const user = jdata.owner.login;
    const sha = rawUrl.split("/raw/")[1].split("/")[0];

    const { identifier, link } = toShare("gist", user, `${gistId}:${sha}`);

    course.remote ??= [];
    course.remote.push({
        identifier
    });

    return { author: jdata.owner.login, course, link } as Import;
};

export const pull = async (identifier: string) => {
    const { mode, author, tag } = fromShare(identifier);
    if (mode === "gist") {
        const [gist, file] = tag.split(":");
        const url = `https://gist.githubusercontent.com/${author}/${gist}/raw/${file}`;

        const res = await fetch(url);

        if (res.status == 404) {
            return { error: "not-found" } as Import;
        } else if (res.status == 403) {
            return { error: "not-allowed" } as Import;
        }

        const jdata = await res.json();

        return {
            author,
            course: jdata,
            link: toShare(mode, author, tag).link
        } as Import;
    }
    return { error: "not-found" } as Import;
};
