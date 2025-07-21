import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPost from '../../models/BlogPost';

class BlogController extends Controller
{
    async handle(req: Request, res: Response) {
        const blogName = req.params.blog_name;
        console.log('blogName', blogName);
        /*const blog = new BlogPost({
            name: '',
            title: '',
            category_id: '',///
            author_id: '',///
            banner: '',
            content: '',
            tag_ids: [],///
            comments: []
        });
        await blog.save();*/
        res.render('blog', {});
    }
}

export default BlogController;