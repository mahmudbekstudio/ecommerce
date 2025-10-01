import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import UserCreateRequest from '../../../requests/UserCreateRequest';
import UserCreateType from '../../../types/UserCreateType';
import bcrypt from "bcrypt";
import User from "../../../../models/User";

class UserCreateController extends ApiController
{
    public request = UserCreateRequest;

    async handle(req: Request, res: Response, data: UserCreateType) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({
            email: data.email,
            status: data.status,
            role: data.role,
            password: hashedPassword,
            data: {
                first_name: data.first_name,
                last_name: data.last_name
            }
        });
        await user.save();
        return {result: true};
    }
}

export default UserCreateController;