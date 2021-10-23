import { Entity } from "@/types/classes/entity";

export function convertToClass<Model>(
	data: Array<Model>,
	Entity: Entity<Model>
) {
	return data.map((item) => new Entity(item));
}
