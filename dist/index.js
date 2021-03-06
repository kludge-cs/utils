"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changelogFunctions = void 0;
const index_1 = require("./lib/index");
async function getDependencyReleaseLine(changesets, depsUpdated, options) {
    if (!options?.repo)
        throw new Error("Please provide a repo.");
    if (!depsUpdated.length)
        return "";
    const commits = (await Promise.all(changesets
        .map((changeset) => {
        if (changeset.commit)
            return index_1.getInfo({
                repo: options.repo,
                commit: changeset.commit
            });
        return null;
    })
        .filter((item) => item)))
        .map((info) => info.links.commit)
        .join(", ");
    const changesetLink = `- Updated dependencies [${commits}]:`;
    const updateLines = depsUpdated.map((dep) => {
        return `  - ${dep.name}@${dep.newVersion}`;
    });
    return [changesetLink, ...updateLines].join("\n");
}
async function getReleaseLine(changeset, _type, options) {
    if (!options?.repo)
        throw new Error("Please provide a repo.");
    const [firstLine, ...futureLines] = changeset.summary.split("\n");
    const lines = futureLines.map((line) => `  ${line}`).join("\n");
    if (changeset.commit) {
        const { links: { commit, pull, user } } = await index_1.getInfo({
            repo: options.repo,
            commit: changeset.commit
        });
        const credit = user ? ` Thanks to ${user}!` : "";
        return `\n\n- ${commit}${pull ?? ""}${credit} - ${firstLine}\n${lines}`;
    }
    return `\n\n- ${firstLine}\n${lines}`;
}
exports.changelogFunctions = {
    getDependencyReleaseLine: getDependencyReleaseLine,
    getReleaseLine: getReleaseLine
};
exports.default = exports.changelogFunctions;
