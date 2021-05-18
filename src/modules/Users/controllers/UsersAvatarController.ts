import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}

export default UsersAvatarController;
