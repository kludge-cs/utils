"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
function commitQuery(commit) {
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
function repoQuery([repo, commits], idx) {
    const [owner, name] = repo.split("/");
    const commitQueries = commits.map(commitQuery).join("\n");
    return `a${idx}: repository(owner: "${owner}" name: "${name}") {
		${commitQueries}
	}`;
}
function buildQuery(repos) {
    return Object.entries(repos).map(repoQuery)
        .join("\n");
}
exports.buildQuery = buildQuery;
