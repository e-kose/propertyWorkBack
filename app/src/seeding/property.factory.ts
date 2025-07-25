import { Property } from "../entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const propertyFactory = setSeederFactory(Property , (faker) => {
	const property = new Property();

	property.name = faker.location.street();
	property.price = +faker.commerce.price({min: 10000, max: 100000});
	property.description = faker.lorem.sentence();
	return property;
});