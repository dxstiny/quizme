/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import type { ICourse } from "@/course";
import { fromShare } from "./share";

type Files = Record<string, object>;
interface IOptions {
    filename?: string;
    description?: string;
    isPublic?: boolean;
}

const pat = () => localStorage.getItem("github.pat");
const me = () => JSON.parse(localStorage.getItem("github.me") ?? "null");

const getHeaders = async (forcePat: string | null = null) => {
    const token = pat() || forcePat;
    if (!token) throw new Error("No GitHub PAT found");

    return {
        Authorization: "Bearer " + token
    };
};

const body = (files: Files, options: IOptions) => {
    const body = {
        public: options.isPublic ?? false,
        description: options.description,
        files: {
            [`_${options.filename ?? "QuizMe"}.md`]: {
                content:
                    "# QuizMe\n\nThis gist was created with QuizMe\n\nhttps://dxstiny.github.io/quizme/"
            }
        }
    };
    for (const [key, value] of Object.entries(files)) {
        body.files[key] = {
            content: JSON.stringify(value, null, 4)
        };
    }
    return JSON.stringify(body);
};

const save = async (
    files: Files,
    options: IOptions = {
        isPublic: false
    }
) => {
    return await setGist(files, options);
};

const update = async (
    files: Files,
    options: IOptions = {
        isPublic: false
    },
    id: string
) => {
    return await setGist(files, options, id);
};

const setGist = async (files: Files, options: IOptions, id?: string) => {
    const headers = await getHeaders();

    let endpoint = "https://api.github.com/gists";
    if (id) {
        endpoint += "/" + id;
    }

    const res = await fetch(endpoint, {
        method: id ? "PATCH" : "POST",
        headers,
        body: body(files, options)
    });

    if (!res.ok) {
        return null;
    }

    const jdata = await res.json();
    return jdata;
};

const fetchMe = () => {
    if (!pat()) return undefined;

    const fromCache = me();
    if (fromCache) return fromCache;

    getHeaders().then(async (headers) => {
        const res = await fetch("https://api.github.com/user", {
            headers
        });
        const data = await res.json();
        localStorage.setItem("github.me", JSON.stringify(data));
    });

    return null;
};
fetchMe();

const isMine = (identifier: string) => {
    const myData = fetchMe();

    if (!myData) return false;

    const myName = myData.login as string;

    const { author } = fromShare(identifier);
    return myName === author;
};

export default {
    pat,
    setPat(pat: string) {
        localStorage.setItem("github.pat", pat);
        fetchMe();
    },
    me: fetchMe,
    save,
    isMine,
    update
};
