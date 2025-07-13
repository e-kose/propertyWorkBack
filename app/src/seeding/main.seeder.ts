import { PropertyFeature } from '../entities/property-feature.entity';
import { PropertyType } from '../entities/property-type.entity';
import { Property } from '../entities/property.entity';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const typeRepo = dataSource.getRepository(PropertyType);
    const propertTypes = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartmant' },
    ]);

    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);

    const propertyFactory = factoryManager.get(Property);
    const propertyFeatueFactory = factoryManager.get(PropertyFeature);
    
    // Create properties using callbacks instead of direct faker references
    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          // Get random elements without using faker directly
          const randomUser = users[Math.floor(Math.random() * users.length)];
          const randomType = propertTypes[Math.floor(Math.random() * propertTypes.length)];
          
          const property = await propertyFactory.make({
            user: randomUser,
            type: randomType,
            propertyFeatue: await propertyFeatueFactory.save(),
          });
          return property;
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
  }
}