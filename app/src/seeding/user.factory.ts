import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user.entity';

export const userFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.avatarUrl = faker.image.avatar();
  return user;
});