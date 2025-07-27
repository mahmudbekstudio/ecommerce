import ApiController from "../ApiController";
import { Request, Response } from "express";

class LogoutController extends ApiController
{
    async handle(req: Request, res: Response): Promise<Object> {
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        return {};
    }
}

export default LogoutController;