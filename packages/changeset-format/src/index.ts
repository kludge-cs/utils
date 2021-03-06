import type {
	ChangelogFunctions,
	ModCompWithPackage,
	NewChangesetWithCommit,
	VersionType
} from "@changesets/types";
import { getInfo } from "./lib/index";

async function getDependencyReleaseLine(
	changesets: NewChangesetWithCommit[],
	depsUpdated: ModCompWithPackage[],
	options: Record<string, any> | null
) {
	if (!options?.repo) throw new Error("Please provide a repo.");
	if (!depsUpdated.length) return "";

	const commits = (await Promise.all(changesets
		.map((changeset) => {
			if (changeset.commit) return getInfo({
				repo: options.repo,
				commit: changeset.commit
			});
			return null;
		})
		.filter((item) => item)))
		.map((info) => info!.links.commit)
		.join(", ");

	const changesetLink = `- Updated dependencies [${commits}]:`;

	const updateLines = depsUpdated.map((dep) => {
		return `  - ${dep.name}@${dep.newVersion}`;
	});

	return [changesetLink, ...updateLines].join("\n");
}

async function getReleaseLine(
	changeset: NewChangesetWithCommit,
	_type: VersionType,
	options: Record<string, any> | null
) {
	if (!options?.repo) throw new Error("Please provide a repo.");

	const [firstLine, ...futureLines] = changeset.summary.split("\n");
	const lines = futureLines.map((line) => `  ${line}`).join("\n");

	if (changeset.commit) {
		const { links: { commit, pull, user } } = await getInfo({
			repo: options.repo,
			commit: changeset.commit
		});
		const credit = user ? ` Thanks to ${user}!` : "";
		return `\n\n- ${commit}${pull ?? ""}${credit} - ${firstLine}\n${lines}`;
	}
	return `\n\n- ${firstLine}\n${lines}`;
}

export const changelogFunctions: ChangelogFunctions = {
	getDependencyReleaseLine: getDependencyReleaseLine,
	getReleaseLine: getReleaseLine
};
export default changelogFunctions;
