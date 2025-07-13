import { PropertyFeature } from '../entities/property-feature.entity';
import { setSeederFactory } from "typeorm-extension";

export const propertFeatureFactory = setSeederFactory(PropertyFeature, (faker)=>{
	const propertyFeature = new PropertyFeature();
	propertyFeature.area = faker.number.int({min: 50, max:2500});
	propertyFeature.bathrooms = faker.number.int({min: 1, max:10});
	propertyFeature.bedrooms = faker.number.int({min: 1, max:10});
	propertyFeature.parkingStops = faker.number.int({min: 10, max:50});
	propertyFeature.hasBalcony = faker.datatype.boolean();
	propertyFeature.hasGardenYard = faker.datatype.boolean();
	propertyFeature.hasSwimmingPool = faker.datatype.boolean();
	return propertyFeature;
})