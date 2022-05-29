import * as useUserHook from "@/hooks/use-user";

export function spyOnUseUser(user: any) {
	jest.spyOn(useUserHook, "useUser").mockReturnValue({
		user,
		mutateUser: jest.fn(),
	});
}
