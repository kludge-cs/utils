import type {
	BareRepositories,
	Commit,
	ParsedInfo,
	PullRequest,
	Repository,
	RequestData,
	Response,
	ResponseData
} from "../types/index";
import DataLoader from "dataloader";
import { buildQuery } from "./queries";
import centra from "@helperdiscord/centra";

const validRepoNameRegex = /^[\w.-]+\/[\w.-]+$/;

async function RequestBatchProcess(
	requests: readonly RequestData[]
): Promise<Commit[]> {
	const repos = requests.reduce((
		collective: BareRepositories,
		value: RequestData
	): BareRepositories => {
		(collective[value.repo]
			? collective[value.repo]
			: collective[value.repo] = []
		).push(value.commit);
		return collective;
	}, {});

	const res: Response = await centra("https://api.github.com/graphql", "POST")
		.header({Authorization: `Token ${process.env.GITHUB_TOKEN}`})
		.body({query: buildQuery(repos)})
		.json();
	if (!res.data) throw new Error(`An error occurred when fetching data from GitHub\n${JSON.stringify(res)}`);
	const { data } = res;

	const keys = Object.keys(data);

	const cleaned: ResponseData = {};
	Object.keys(repos).forEach((repo, index) => {
		const store: Repository = {};
		Object.entries(data[keys[index]]).forEach(([hash, commit]) => {
			store[hash.substring(1)] = commit;
		});
		cleaned[repo] = store;
	});

	return requests.map(({ repo, commit }) => cleaned[repo][commit]);
}

const GHDataLoader = new DataLoader(RequestBatchProcess);

function pullRequestSorter(pullA: PullRequest, pullB: PullRequest) {
	if (!pullA.mergedAt && !pullB.mergedAt) return 0;
	if (!pullA.mergedAt) return 1;
	if (!pullB.mergedAt) return -1;
	const aDate = new Date(pullA.mergedAt);
	const bDate = new Date(pullB.mergedAt);
	if (aDate > bDate) return 1;
	if (aDate < bDate) return -1;
	return 0;
}

export async function getInfo(
	request: RequestData
): Promise<ParsedInfo> {
	if (!request.commit) throw new Error("Please pass a commit SHA.");
	/* eslint-disable-next-line max-len */
	if (!request.repo || !validRepoNameRegex.test(request.repo)) throw new Error("Please pass a repository in the form of scope/repo");

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
