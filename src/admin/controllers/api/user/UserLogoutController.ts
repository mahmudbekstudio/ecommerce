import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';

class UserLogoutController extends ApiController
{
    handle(req: Request, res: Response, data: any = null) {
        return {};
    }
}

export default UserLogoutController;