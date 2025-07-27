import Controller from "../Controller";
import { Request, Response } from "express";
import BlogTag from "../../models/BlogTag";

class BlogPostController extends Controller
{
    public view = 'blog-post';
    async handle(req: Request, res: Response): Object {
        return {
            blogTags: await BlogTag.find().sort({title: 1}),
        };
    }
}

export default BlogPostController;