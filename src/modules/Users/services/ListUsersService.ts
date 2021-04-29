import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();
    return users;
  }
}

export default ListUsersService;
