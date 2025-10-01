import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import User from '../../../../models/User';
import UserType from '../../../../types/UserType';

class UserListController extends ApiController
{
    async handle(req: Request, res: Response, data: any = null) {
        const users: UserType[] = await User.find();
        console.log('users', users);
        return {};
    }
}

export default UserListController;