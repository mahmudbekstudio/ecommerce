import ApiController from "../ApiController";
import { Request, Response } from "express";
import LoginRequest from '../../requests/LoginRequest';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import LoginType from "../../types/LoginType";
import generateToken from "../../lib/generateToken";

class LoginController extends ApiController
{
    public request = LoginRequest;

    async handle(req: Request, res: Response, data: LoginType): Promise<Object> {
        const userItem = await User.findOne({email: data.email});

        if (!userItem || !(await bcrypt.compare(data.password, userItem.password))) {
            res.statusCode = 400;
            res.json({error: 'Error', data: {email: 'Email or password incorrect'}});
        } else {
            const token = generateToken(userItem)
            res.cookie('refreshToken', token.token, {
                httpOnly: true,
                //secure: true,
                sameSite: 'strict',
                maxAge: token.refreshTokenExpireTime
            });
            res.cookie('token', token.refreshToken, {
                httpOnly: true,
                //secure: true,
                sameSite: 'strict',
                maxAge: token.tokenExpireTime
            });

            return {result: true, data: token.data};
        }
    }
}

export default LoginController;