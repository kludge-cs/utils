"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const queries_1 = require("./queries");
const centra_1 = __importDefault(require("@helperdiscord/centra"));
const validRepoNameRegex = /^[\w.-]+\/[\w.-]+$/;
async function RequestBatchProcess(requests) {
    const repos = requests.reduce((collective, value) => {
        (collective[value.repo]
            ? collective[value.repo]
            : collective[value.repo] = []).push(value.commit);
        return collective;
    }, {});
    const res = await centra_1.default("https://api.github.com/graphql", "POST")
        .header({ Authorization: `Token ${process.env.GITHUB_TOKEN}` })
        .body({ query: queries_1.buildQuery(repos) })
        .json();
    if (!res.data)
        throw new Error(`An error occurred when fetching data from GitHub\n${JSON.stringify(res)}`);
    const { data } = res;
    const keys = Object.keys(data);
    const cleaned = {};
    Object.keys(repos).forEach((repo, index) => {
        const store = {};
        Object.entries(data[keys[index]]).forEach(([hash, commit]) => {
            store[hash.substring(1)] = commit;
        });
        cleaned[repo] = store;
    });
    return requests.map(({ repo, commit }) => cleaned[repo][commit]);
}
const GHDataLoader = new dataloader_1.default(RequestBatchProcess);
function pullRequestSorter(pullA, pullB) {
    if (!pullA.mergedAt && !pullB.mergedAt)
        return 0;
    if (!pullA.mergedAt)
        return 1;
    if (!pullB.mergedAt)
        return -1;
    const aDate = new Date(pullA.mergedAt);
    const bDate = new Date(pullB.mergedAt);
    if (aDate > bDate)
        return 1;
    if (aDate < bDate)
        return -1;
    return 0;
}
async function getInfo(request) {
    if (!request.commit)
        throw new Error("Please pass a commit SHA.");
    if (!request.repo || !validRepoNameRegex.test(request.repo))
        throw new Error("Please pass a repository in the form of scope/repo");
    const data = await GHDataLoader.load(request);
    const pullRequest = data.associatedPullRequests?.nodes?.length
        ? data.associatedPullRequests.nodes.sort(pullRequestSorter)[0]
        : null;
    const user = pullRequest?.author ?? data.author.user;
    return {
        user: user.login,
        pull: pullRequest?.number ?? null,
        links: {
            commit: `[\`${request.commit}\`](${data.commitUrl})`,
            pull: pullRequest
                ? `([#${pullRequest.number}](${pullRequest.url}))`
                : null,
            user: user ? `[[@${user.login}](${user.url})]` : null
        }
    };
}
exports.getInfo = getInfo;
