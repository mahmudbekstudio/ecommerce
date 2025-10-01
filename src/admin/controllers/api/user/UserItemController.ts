import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import User from '../../../../models/User';

class UserItemController extends ApiController
{
    async handle(req: Request, res: Response, data: any = null) {
        try {
            const user = await User.findById(req.params.id);

            return {
                result: true,
                user: {
                    status: user.status,
                    role: user.role,
                    email: user.email,
                    first_name: user.data.first_name,
                    last_name: user.data.last_name,
                    createdAt: user.createdAt
                }
            };
        } catch (e) {
            throw Error('User is not exist');
        }
    }
}

export default UserItemController;