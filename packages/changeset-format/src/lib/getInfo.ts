import type {
	BareRepos,
	Commit,
	PR,
	ParsedInfo,
	Repo,
	ReqData,
	Res,
	ResData
} from "../types/index";
import DataLoader from "dataloader";
import { buildQuery } from "./queries";
import req from "petitio";

async function reqBatchProc(
	requests: readonly ReqData[]
): Promise<Commit[]> {
	const repos = requests.reduce((all: BareRepos, val: ReqData): BareRepos => {
		(all[val.repo] ?? (all[val.repo] = [])).push(val.commit);
		return all;
	}, {});

	const res: Res = await req("https://api.github.com/graphql", "POST")
		.header({Authorization: `Token ${process.env.GITHUB_TOKEN}`})
		.body({query: buildQuery(repos)})
		.json();
	if (!res.data) throw new Error(`An error occurred when fetching data from GitHub\n${JSON.stringify(res)}`);
	const { data } = res;

	const keys = Object.keys(data);
	const cleaned: ResData = {};
	Object.keys(repos).forEach((repo, index) => {
		const store: Repo = {};
		Object.entries(data[keys[index]]).forEach(([hash, commit]) => {
			store[hash] = commit;
		});
		cleaned[repo] = store;
	});

	return requests.map(({ repo, commit }) => cleaned[repo][commit]);
}

const GHDataLoader = new DataLoader(reqBatchProc);

export async function getInfo(
	request: ReqData
): Promise<ParsedInfo> {
	const data = await GHDataLoader.load(request);
	let pull: PR | null;
	pull = data.associatedPullRequests.nodes[0];
	pull = pull?.merged ? pull : null;
	const user = pull?.author ?? data.author.user;

	return {
		user: user.login,
		pull: pull?.number ?? null,
		links: {
			commit: `[\`${request.commit}\`](${data.commitUrl})`,
			pull: pull
				? `([#${pull.number}](${pull.url}))`
				: null,
			user: `[[@${user.login}](${user.url})]`
		}
	};
}
