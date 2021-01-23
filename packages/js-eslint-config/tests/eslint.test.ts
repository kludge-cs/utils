const eslintConfig = require("../src");

describe("ESLint Config", () => {
	test("should export rules", () => {
		expect(eslintConfig.root).toBe(true);
		expect(eslintConfig).toMatchSnapshot();
	});
});
