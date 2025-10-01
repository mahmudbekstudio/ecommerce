import Middleware from '../../middlewares/Middleware';
import {NextFunction, Request, Response} from "express";
import mainConfig from "../../configs/main";
import userRoles from '../../configs/user_roles';
import jwt from "jsonwebtoken";

class IsAdminMiddleware extends Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization')?.replace('Bearer: ', '');
            if (!token) throw Error('Token is not exist');

            const jwtSecret = process.env.JWT_SECRET || mainConfig.token.defaultJwtSecret;
            const userToken = jwt.verify(token, jwtSecret);

            if (userToken.type !== 'access') throw Error('Token is not access token');
            if (userToken.role !== userRoles.ADMIN) throw Error('Token do not belong to Admin');

            next();
        } catch (e) {
            res.statusCode = 401;
            res.send({result: false, error: 'Access token is not valid'});
        }
    }
}

export default IsAdminMiddleware;