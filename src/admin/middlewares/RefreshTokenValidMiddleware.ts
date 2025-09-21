import Middleware from '../../middlewares/Middleware';
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
class RefreshTokenValidMiddleware extends Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        try {
            const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
            jwt.verify(req.body.refreshToken, jwtSecret)
            next();
        } catch (e) {
            res.statusCode = 401;
            res.send({result: false, error: 'Refresh token is not valid'});
        }
    }
}

export default RefreshTokenValidMiddleware;