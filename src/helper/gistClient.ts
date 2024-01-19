/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

type Files = Record<string, object>;

const pat = () => localStorage.getItem("github.pat");

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

    console.log(res);

    if (!res.ok) {
        return null;
    }

    const jdata = await res.json();
    if (!isPublic && jdata.id) {
        await fetch("/api/config", {
            method: "PUT",
            body: JSON.stringify({
                github: {
                    gistId: jdata.id
                }
            })
        });
    }
    return jdata;
};

export default {
    pat,
    setPat(pat: string) {
        localStorage.setItem("github.pat", pat);
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
    }
};
