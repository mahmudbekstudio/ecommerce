import Middleware from '../../middlewares/Middleware';
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import mainConfig from '../../configs/main';

class RefreshTokenValidMiddleware extends Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        try {
            const jwtSecret = process.env.JWT_SECRET || mainConfig.token.defaultJwtSecret;
            const userToken = jwt.verify(req.body.refreshToken, jwtSecret);

            if (userToken.type !== 'refresh') throw Error('Token is not refresh token');

            next();
        } catch (e) {
            res.statusCode = 401;
            res.send({result: false, error: 'Refresh token is not valid'});
        }
    }
}

export default RefreshTokenValidMiddleware;