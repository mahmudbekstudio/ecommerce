import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import LoginRequest from '../../../requests/LoginRequest';
import User from '../../../../models/User';
import bcrypt from "bcrypt";
import generateToken from "../../../../lib/generateToken";
import user_statuses from "../../../../configs/user_statuses";

class UserLoginController extends ApiController
{
    public request = LoginRequest;
    async handle(req: Request, res: Response, data: any = null) {
        const userItem = await User.findOne({email: data.email});

        if (!userItem || !(await bcrypt.compare(data.password, userItem.password))) {
            res.statusCode = 400;
            res.json({ error: 'Error', data: { email: 'Email or password incorrect' } });
            return {result: false};
        }

        if (userItem.status === user_statuses.ACTIVE) {
            const tokenData = generateToken(userItem, {role: 'role', statue: 'status', id: '_id'});
            return { result: true, token: tokenData.token, user: tokenData.user };
        }

        if (userItem.status === user_statuses.NOT_ACTIVE) {
            throw new Error('User not active');
        }

        if (userItem.status === user_statuses.BLOCKED) {
            throw new Error('User blocked');
        }

        return { result: true };
    }
}

export default UserLoginController;