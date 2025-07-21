import Controller from "../Controller";
import { Request, Response } from "express";

class BlogPostController extends Controller
{
    async handle(req: Request, res: Response) {
        this.setTitle('My post')
        res.render('blog-post', {});
    }
}

export default BlogPostController;