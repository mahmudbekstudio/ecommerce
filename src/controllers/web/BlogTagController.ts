import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPostService from "../../services/BlogPostService";

class BlogTagController extends Controller
{
    public view = 'blog';
    public title = 'Blog';

    async handle(req: Request, res: Response): Promise<Object> {
        const blogPostService = new BlogPostService(parseInt(req.query.page as string) || 1);
        blogPostService.setTagName(req.params.tag_name);
        blogPostService.setStatus(true);

        let totalPages;
        let blogPosts;
        let currentPage;
        let tagName;

        try {
            totalPages = await blogPostService.getTotalPage();
            blogPosts = await blogPostService.getBlogPosts();
            currentPage = blogPostService.page;
            tagName = blogPostService.getBlog()?.name;
        } catch (e) {
            console.log('error', e);
            res.redirect(404, '/404');
            return false;
        }

        return {
            title: this.title + (tagName ? ' ' + blogPostService.getBlog().title : ''),
            totalPages,
            blogPosts,
            currentPage,
        };
    }
}

export default BlogTagController;