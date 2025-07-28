import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPostService from "../../services/BlogPostService";

class BlogPostController extends Controller
{
    public view = 'blog-post';
    async handle(req: Request, res: Response): Promise<Object> {
        const blogPostService = new BlogPostService();

        try {
            return {
                blogPost: await blogPostService.getBlogPostByName(req.params.post_name)
            };
        } catch (e) {
            console.log('error', e);
            res.redirect(404, '/404');
            return false;
        }
    }
}

export default BlogPostController;