import type { BareRepositories, RequestData } from "../types/index";

// TODO: replace js templating with graphql variables

function commitQuery(commit: RequestData["commit"]): string {
	return `a${commit}: object(expression: "${commit}") {
		... on Commit {
			commitUrl
			associatedPullRequests(first: 50) {
				nodes {
					number
					url
					mergedAt
					author { login url }
				}
			}
			author { user { login url } }
		}
	}`;
}

function repoQuery(
	[repo, commits]: [RequestData["repo"], RequestData["commit"][]],
	idx: number
): string {
	const [owner, name] = repo.split("/");
	const commitQueries = commits.map(commitQuery).join("\n");
	return `a${idx}: repository(owner: "${owner}" name: "${name}") {
		${commitQueries}
	}`;
}

export function buildQuery(repos: BareRepositories): string {
	return Object.entries(repos).map(repoQuery)
		.join("\n");
}
