import Controller from "../Controller";
import { Request, Response } from "express";

class LoginController extends Controller
{
    handle(req: Request, res: Response) {
        res.json({});
    }
}

export default LoginController;