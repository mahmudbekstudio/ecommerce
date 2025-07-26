import Controller from "../Controller";
import { Request, Response } from "express";

class NotFoundController extends Controller
{
    public title: string = 'Not found';
    handle(req: Request, res: Response) {
        res.render('not-found', {});
    }
}

export default NotFoundController;