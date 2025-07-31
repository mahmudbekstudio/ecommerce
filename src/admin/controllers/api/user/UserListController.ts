import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';

class UserListController extends ApiController
{
    handle(req: Request, res: Response, data: any = null) {
        return {};
    }
}

export default UserListController;