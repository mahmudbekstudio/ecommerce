import Controller from "../Controller";
import { Request, Response } from "express";

class BlogTagController extends Controller
{
    handle(req: Request, res: Response) {
        res.render('blog', {});
    }
}

export default BlogTagController;