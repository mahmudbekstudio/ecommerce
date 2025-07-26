import Controller from "../Controller";
import { Request, Response } from "express";
import BlogTag from "../../models/BlogTag";

class BlogPostController extends Controller
{
    async handle(req: Request, res: Response) {
        res.render('blog-post', {
            blogTags: await BlogTag.find().sort({title: 1}),
        });
    }
}

export default BlogPostController;