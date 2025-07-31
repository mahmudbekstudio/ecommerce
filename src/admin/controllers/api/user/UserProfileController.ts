import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';

class UserProfileController extends ApiController
{
    handle(req: Request, res: Response, data: any = null) {
        return {};
    }
}

export default UserProfileController;