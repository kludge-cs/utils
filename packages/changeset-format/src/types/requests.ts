export type RepoID = string;
export type CommitID = string;

export interface ReqData {
	commit: CommitID;
	repo: RepoID;
}

export interface BareRepos {
  [key: string]: CommitID[];
}

export interface GitActor {
	login: string;
	url: string;
}

export interface PR {
	number: number;
	url: string;
	merged: boolean;
	author: GitActor;
}

export interface Commit {
	commitUrl: CommitID;
	associatedPullRequests: {
		nodes: PR[];
	};
	author: {
		user: GitActor;
	};
}

export interface Repo {
	[key: string]: Commit;
}

export interface ResData {
	[key: string]: Repo;
}

export interface Res {
	data?: ResData;
}

export interface ParsedInfo {
	user: string | null;
	pull: number | null;
	links: {
		commit: string;
		pull: string | null;
		user: string | null;
	};
}
