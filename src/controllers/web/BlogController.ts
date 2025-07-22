import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPost from '../../models/BlogPost';
import User from '../../models/User';
import Blog from '../../models/Blog';
import BlogTag from '../../models/BlogTag';

class BlogController extends Controller
{
    public title = 'Blog';
    async handle(req: Request, res: Response) {
        const blogName = req.params.blog_name;
        console.log('blogName', blogName);
        /*const user = await User.findOne({email: 'mahmudbekstudio@mail.ru'});

        const blogBeauty = await Blog.findOne({name: 'beauty'});
        const blogFood = await Blog.findOne({name: 'food'});
        const blogLifeStyle = await Blog.findOne({name: 'life-style'});
        const blogTravel = await Blog.findOne({name: 'travel'});

        const blogTagTrending = await BlogTag.findOne({name: 'trending'});
        const blogTagCooking = await BlogTag.findOne({name: 'cooking'});
        const blogTagHealthyFood = await BlogTag.findOne({name: 'healthy-food'});
        const blogTagLifeStyle = await BlogTag.findOne({name: 'life-style'});

        const blogPost = new BlogPost({
            name: 'post6',
            title: 'Cooking tips make cooking simple',
            category_id: blogFood._id,
            author_id: user._id,
            banner: 'img/blog/blog-6.jpg',
            content: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
            tag_ids: [blogBeauty._id, blogTravel._id],
            comments: []
        });
        await blogPost.save();*/
        res.render('blog', {
            title: this.title,
            blogCategories: [],
            blogTags: await BlogTag.find().sort({title: 1}),
        });
    }
}

export default BlogController;