import type { ICourse } from "@/course";
import gistClient from "@/helper/gistClient";
import { toShare, fromShare, type Import } from ".";

const push = async (course: ICourse, isPublic: boolean = false) => {
    const name = `${course.title}.qm`;
    const options = {
        filename: course.title,
        description: course.description,
        isPublic
    };

    let jdata: any;

    const copy = JSON.parse(JSON.stringify(course));
    delete copy.remote;

    if (course.remote?.length) {
        const remote = course.remote[0].identifier;
        const { mode, author, tag } = fromShare(remote);
        const [gist, file] = tag.split(":");
        jdata = await gistClient.update({ [name]: copy }, options, gist);
    } else {
        jdata = await gistClient.save({ [name]: copy }, options);
    }

    const file = jdata.files[name];
    const rawUrl = file.raw_url;
    // "https://gist.githubusercontent.com/{user}/{gist}/raw/{file}/{filename}"
    // gist:{user}:{gist}:{filename}
    const gistId = jdata.id;
    const user = jdata.owner.login;
    const sha = rawUrl.split("/raw/")[1].split("/")[0];

    const { identifier, link } = toShare("gist", user, `${gistId}:${sha}`);

    if (!course.remote?.length) {
        course.remote = [];
        course.remote.push({
            identifier
        });
    }

    return { author: jdata.owner.login, course, link } as Import;
};

const pull = async (identifier: string) => {
    const { mode, author, tag } = fromShare(identifier);
    if (mode === "gist") {
        const [gist, file] = tag.split(":");
        const url = `https://gist.githubusercontent.com/${author}/${gist}/raw/`;

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

export const gistShare = { push, pull };
