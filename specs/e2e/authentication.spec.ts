import { test } from "@playwright/test";

test.describe("User", () => {
	test.describe("when unauthenticated", () => {
		test("should go to login page when trying to access missing page", async ({
			page,
		}) => {
			// Test
		});
	});
});
