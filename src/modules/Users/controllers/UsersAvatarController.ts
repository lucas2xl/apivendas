import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/CreateUserService';

class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(user);
  }
}

export default UsersAvatarController;
