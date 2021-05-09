import { Request, Response } from 'express';
import ResetPasswordService from '@modules/Users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ token, password });

    return res.status(204).json();
  }
}

export default ResetPasswordController;
