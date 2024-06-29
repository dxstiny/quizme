/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import type { ICourse } from "@/course";
import { fromShare } from "./share";

type Files = Record<string, object>;

const pat = () => localStorage.getItem("github.pat");
const me = () => JSON.parse(localStorage.getItem("github.me") ?? "null");

const getHeaders = async (forcePat: string | null = null) => {
    const token = pat() || forcePat;
    if (!token) throw new Error("No GitHub PAT found");

    return {
        Authorization: "Bearer " + token
    };
};

const body = (
    files: Files,
    filename: string = "QuizMe",
    description: string = "Shared with QuizMe",
    isPublic: boolean = false
) => {
    const body = {
        public: isPublic,
        description: description,
        files: {
            [`_${filename}.md`]: {
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
    filename: string,
    description: string,
    isPublic: boolean = false
) => {
    const headers = await getHeaders();
    const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers,
        body: body(files, filename, description, isPublic)
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

const isMine = (identifier: string) => {
    const myData = fetchMe();

    if (!myData) return false;

    const myName = myData.login as string;

    const { author } = fromShare(identifier);
    return myName === author;
};

const update = async (course: ICourse, identifier: string) => {
    const { tag } = fromShare(identifier);

    const [id] = tag.split(":");

    const name = `${course.title}.qm`;
    const files = { [name]: course };

    const headers = await getHeaders();
    const res = await fetch(`https://api.github.com/gists/${id}`, {
        method: "PATCH",
        headers,
        body: body(files, course.title, course.description, false)
    });

    if (!res.ok) {
        return null;
    }

    const jdata = await res.json();
    return jdata;
};

export default {
    pat,
    setPat(pat: string) {
        localStorage.setItem("github.pat", pat);
        fetchMe();
    },
    save,
    search: async (forcePat: string | null = null) => {
        // searches for gists with the filename "one.lib.json"
        const headers = await getHeaders(forcePat);
        const res = await fetch(`https://api.github.com/gists`, {
            headers
        });
        const data = await res.json();

        // search for file "my.one.collection"
        const filename = "my.one.collection";
        const gist = data?.find((gist: any) => gist.files?.[filename]);
        return gist?.id;
    },
    me: fetchMe,
    isMine,
    update
};
