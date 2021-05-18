import { Response, Request } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { classToClass } from 'class-transformer';

interface IRequest {
  email: string;
  password: string;
}

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as IRequest;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({ email, password });

    return res.json(classToClass(user));
  }
}

export default SessionsController;
