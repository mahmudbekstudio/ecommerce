import Middleware from '../../middlewares/Middleware';
import {NextFunction, Request, Response} from "express";
class IsAuthedMiddleware extends Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        console.log('IsAuthedMiddleware');
        next();
    }
}

export default IsAuthedMiddleware;