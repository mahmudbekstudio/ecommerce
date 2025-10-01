import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import User from "../../../../models/User";

class UserDeleteController extends ApiController
{
    async handle(req: Request, res: Response, data: any = null) {
        try {
            await User.deleteOne({ _id: req.params.id});

            return {result: true};
        } catch (e) {
            throw Error('User is not exist');
        }
    }
}

export default UserDeleteController;