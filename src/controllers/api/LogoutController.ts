import ApiController from "../ApiController";
import { Request, Response } from "express";

class LogoutController extends ApiController
{
    async handle(req: Request, res: Response) {
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        res.json({});
    }
}

export default LogoutController;