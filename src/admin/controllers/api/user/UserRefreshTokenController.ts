import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import generateToken from "../../../../lib/generateToken";
import User from "../../../../models/User";
import user_roles from "../../../../configs/user_roles";
import mainConfig from "../../../../configs/main";

class UserRefreshTokenController extends ApiController
{
    async handle(req: Request, res: Response, data: any = null) {
        const jwtSecret = process.env.JWT_SECRET || mainConfig.token.defaultJwtSecret;
        const userToken = jwt.verify(req.body.refreshToken, jwtSecret)
        const userItem = await User.findById(userToken.id);

        if (!userItem || [user_roles.ADMIN, user_roles.MANAGER].indexOf(userItem.role) === -1) {
            return {result: false, error: 'You do not have permission'};
        }

        const { token, user } = generateToken(userItem, {role: 'role', statue: 'status', id: '_id'});
        return { result: true, token, user };
    }
}

export default UserRefreshTokenController;