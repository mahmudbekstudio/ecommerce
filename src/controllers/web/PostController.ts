import Controller from "../Controller";
import { Request, Response } from "express";

class PostController extends Controller
{
    handle(req: Request, res: Response) {
        res.send('Post' + JSON.stringify(req.params));
    }
}

export default PostController;