import ApiController from "../ApiController";
import { Request, Response } from "express";
import LoginRequest from '../../requests/LoginRequest';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import LoginType from "../../types/LoginType";
import generateToken from "../../lib/generateToken";
import user_statuses from "../../configs/user_statuses";

class LoginController extends ApiController
{
    public request = LoginRequest;

    async handle(req: Request, res: Response, data: LoginType): Promise<Object> {
        const userItem = await User.findOne({email: data.email});

        if (!userItem || !(await bcrypt.compare(data.password, userItem.password))) {
            res.statusCode = 400;
            res.json({error: 'Error', data: {email: 'Email or password incorrect'}});
            return {result: false};
        }

        if (userItem.status === user_statuses.ACTIVE) {
            const data = generateToken(userItem)
            res.cookie('refreshToken', data.token.accessToken, {
                httpOnly: true,
                //secure: true,
                sameSite: 'strict',
                maxAge: data.token.refreshTokenExpireTime
            });
            res.cookie('token', data.token.refreshToken, {
                httpOnly: true,
                //secure: true,
                sameSite: 'strict',
                maxAge: data.token.tokenExpireTime
            });

            return {result: true, data: data.user};
        }

        if (userItem.status === user_statuses.NOT_ACTIVE) {
            throw new Error('User not active');
        }

        if (userItem.status === user_statuses.BLOCKED) {
            throw new Error('User blocked');
        }

        return {result: true};
    }
}

export default LoginController;