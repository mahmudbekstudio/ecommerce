import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';

class UserDeleteController extends ApiController
{
    handle(req: Request, res: Response, data: any = null) {
        return {};
    }
}

export default UserDeleteController;