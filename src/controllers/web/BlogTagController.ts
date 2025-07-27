import Controller from "../Controller";
import { Request, Response } from "express";

class BlogTagController extends Controller
{
    public view = 'blog';
    handle(req: Request, res: Response): Object {
        return {};
    }
}

export default BlogTagController;