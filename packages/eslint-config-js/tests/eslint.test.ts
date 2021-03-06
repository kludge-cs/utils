// @ts-ignore: using ts-jest for different directory creates false warning
import eslintConfig from "../src";

describe("ESLint Config", () => {
	test("should export rules", () => {
		expect(eslintConfig.root).toBe(true);
		expect(eslintConfig).toMatchSnapshot();
	});

	test("should pass for require", () => {
		/* eslint-disable-next-line @typescript-eslint/no-var-requires */
		expect(require("../src")).toStrictEqual(eslintConfig);
	});
});
