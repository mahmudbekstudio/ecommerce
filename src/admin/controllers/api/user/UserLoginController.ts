import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import LoginRequest from '../../../requests/LoginRequest';
import User from '../../../../models/User';
import UserType from '../../../../types/UserType';
import bcrypt from "bcrypt";
import generateToken from "../../../../lib/generateToken";
import user_statuses from "../../../../configs/user_statuses";
import user_roles from '../../../../configs/user_roles';

class UserLoginController extends ApiController
{
    public request = LoginRequest;
    async handle(req: Request, res: Response, data: any = null) {
        const userItem: UserType|null = await User.findOne({email: data.email});

        if (!userItem || !(await bcrypt.compare(data.password, userItem.password))) {
            return this.throwError(res, 'Email or password incorrect');
        }

        if (userItem.status === user_statuses.ACTIVE) {
            if ([user_roles.ADMIN, user_roles.MANAGER].indexOf(userItem.role) === -1) {
                return this.throwError(res, 'Email or password incorrect');
            }

            const { token, user } = generateToken(userItem, {role: 'role', statue: 'status', id: '_id'});
            return { result: true, token, user };
        }

        if (userItem.status === user_statuses.NOT_ACTIVE) {
            return this.throwError(res, 'User not active');
        }

        if (userItem.status === user_statuses.BLOCKED) {
            return this.throwError(res, 'User blocked');
        }

        return { result: true };
    }

    throwError(res: Response, message: string, status: number = 400) {
        res.statusCode = status;

        return { result: false, error: 'Error', data: { email: message } };
    }
}

export default UserLoginController;