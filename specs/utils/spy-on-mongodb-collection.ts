import { Collection, Db } from "mongodb";

export function spyOnMongoDBCollection(db: Db, methods: (keyof Collection)[]) {
	methods.forEach((method) => {
		jest.spyOn(db, "collection").mockImplementation(
			jest.fn(() => ({ [method]: jest.fn() } as any))
		);
	});
}
