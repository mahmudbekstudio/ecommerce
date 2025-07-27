import ApiController from "../ApiController";
import { Request, Response } from "express";
import SignupRequest from '../../requests/SignupRequest';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import SignupType from "../../types/SignupType";

class SignupController extends ApiController
{
    public request = SignupRequest;

    async handle(req: Request, res: Response, data: SignupType): Promise<Object> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({
            email: data.email,
            password: hashedPassword,
            data: {
                first_name: data.first_name,
                last_name: data.last_name
            }
        });
        await user.save();
        return {
            result: true
        };
    }
}

export default SignupController;