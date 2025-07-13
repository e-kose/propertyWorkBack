import databaseConfig from '../config/db.config';
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeder, runSeeders, SeederOptions } from "typeorm-extension";
import { propertyFactory } from "./property.factory";
import { userFactory } from "./user.factory";
import { propertFeatureFactory } from "./property-feature.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
	...databaseConfig(),
	factories : [propertyFactory, userFactory, propertFeatureFactory],
	seeds : [MainSeeder]
}

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
	await dataSource.synchronize(true);
	await runSeeders(dataSource);
	process.exit();
})