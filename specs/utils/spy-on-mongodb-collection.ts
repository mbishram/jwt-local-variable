import { Collection, Db } from "mongodb";

export function spyOnMongoDBCollection(
	db: Db,
	methods: (keyof Collection)[],
	implementation: () => any | undefined
) {
	methods.forEach((method) => {
		jest.spyOn(db, "collection").mockImplementation(
			jest.fn(() => ({ [method]: implementation } as any))
		);
	});
}
