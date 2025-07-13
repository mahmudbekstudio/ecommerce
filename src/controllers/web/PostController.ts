import Controller from "../Controller";
import { Request, Response } from "express";

class PostController extends Controller
{
    handle(req: Request, res: Response) {
        this.setTitle('My post')
        res.render('post', {});
    }
}

export default PostController;