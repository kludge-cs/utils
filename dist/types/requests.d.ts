export declare type repo = string;
export declare type commit = string;
export interface RequestData {
    commit: commit;
    repo: repo;
}
export interface BareRepositories {
    [key: string]: commit[];
}
export interface GitActor {
    login: string;
    url: string;
}
export interface PullRequest {
    number: number;
    url: string;
    mergedAt: string | null;
    author: GitActor;
}
export interface Commit {
    commitUrl: commit;
    associatedPullRequests: {
        nodes: PullRequest[];
    };
    author: {
        user: GitActor;
    };
}
export interface Repository {
    [key: string]: Commit;
}
export interface ResponseData {
    [key: string]: Repository;
}
export interface Response {
    data?: ResponseData;
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
//# sourceMappingURL=requests.d.ts.map