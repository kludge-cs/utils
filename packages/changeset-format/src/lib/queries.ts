import type { BareRepos, CommitID, RepoID } from "../types/index";

const COMMIT_FRAGMENT = `
fragment commitFields on Commit {
	commitUrl
	associatedPullRequests(first: 1, orderBy: {field: UPDATED_AT, direction: DESC}) {
		nodes { number url author { login url } merged }
	}
	author { user { login url } }
}
`;

function commitQuery(commit: CommitID): string {
	return `a${commit}: object(expression: "${commit}") {
		...commitFields
	}`;
}

function repoQuery([repo, commits]: [RepoID, CommitID[]]): string {
	const [owner, name] = repo.split("/");
	return `${name}: repository(owner: "${owner}" name: "${name}") {
		${commits.map(commitQuery).join("\n")}
	}`;
}

export function buildQuery(repos: BareRepos): string {
	return `
		${Object.entries(repos).map(repoQuery)
		.join("\n")}
		${COMMIT_FRAGMENT}
	`;
}
