import Controller from "../Controller";
import { Request, Response } from "express";

class NotFoundController extends Controller
{
    public title: string = 'Not found';
    public view = 'not-found';
    handle(req: Request, res: Response) {
        return {};
    }
}

export default NotFoundController;