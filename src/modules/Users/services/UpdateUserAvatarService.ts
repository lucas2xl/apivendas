import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import DiskStorageProvider from '@shared/http/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/http/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    let fileName;

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const StorageProvider = new S3StorageProvider();
      if (user.avatar) {
        await StorageProvider.deleteFile(user.avatar);
      }

      fileName = await StorageProvider.saveFile(avatarFileName);
    } else {
      const StorageProvider = new DiskStorageProvider();
      if (user.avatar) {
        await StorageProvider.deleteFile(user.avatar);
      }

      fileName = await StorageProvider.saveFile(avatarFileName);
    }

    user.avatar = fileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
