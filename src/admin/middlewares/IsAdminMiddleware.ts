import Middleware from '../../middlewares/Middleware';
import {NextFunction, Request, Response} from "express";

class IsAdminMiddleware extends Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        console.log('IsAdminMiddleware');
        next();
    }
}

export default IsAdminMiddleware;