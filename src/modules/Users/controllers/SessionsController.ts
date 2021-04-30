import { Response, Request } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({ email, password });

    return res.json(user);
  }
}

export default SessionsController;
