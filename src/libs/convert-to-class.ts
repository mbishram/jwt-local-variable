import { Entity } from "@/types/classes/entity";

/**
 * Convert array of data into array of model
 * @param data
 * @param Entity
 */
export function convertToClass<Model>(
	data: Array<Model>,
	Entity: Entity<Model>
) {
	return data.map((item) => new Entity(item));
}
