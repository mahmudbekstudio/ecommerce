import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPostService from '../../services/BlogPostService';

class BlogController extends Controller
{
    public title = 'Blog';
    public view = 'blog';

    async handle(req: Request, res: Response): Promise<Object | boolean> {
        const blogPostService = new BlogPostService(parseInt(req.query.page as string) || 1);
        blogPostService.setCategoryName(req.params.blog_name);
        blogPostService.setStatus(true);

        let totalPages;
        let blogPosts;
        let currentPage;
        let blogName;

        try {
            totalPages = await blogPostService.getTotalPage();
            blogPosts = await blogPostService.getBlogPosts();
            currentPage = blogPostService.page;
            blogName = blogPostService.getBlog()?.name;
        } catch (e) {
            console.log('error', e);
            res.redirect(404, '/404');
            return false;
        }

        return {
            title: this.title + (blogName ? ' ' + blogPostService.getBlog().title : ''),
            totalPages,
            blogPosts,
            currentPage,
            blogName,
        };
    }
}

export default BlogController;