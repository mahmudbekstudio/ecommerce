import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPost from '../../models/BlogPost';
import User from '../../models/User';
import Blog from '../../models/Blog';
import BlogTag from '../../models/BlogTag';
import moment from 'moment';
import BlogPostType from "../../types/BlogPostType";
import mainConfig from '../../configs/main';

class BlogController extends Controller
{
    public title = 'Blog';
    async handle(req: Request, res: Response) {
        let page = parseInt(req.query.page as string) || 1;
        const limit = mainConfig.pagination.count;
        let skip = (page - 1) * limit;
        const blogName = req.params.blog_name;
        const match = {$match: {status: true}};

        if (blogName) {
            const blog = await Blog.findOne({name: blogName});

            if (!blog) {
                res.redirect(404, '/404');
                return false;
            }

            match.$match.category_id = blog._id;
            this.title += ' ' + blog.title;
        }

        const countTotal = await BlogPost.aggregate([
            match,
            { $count: 'count' }
        ]);
        const postsCount = countTotal[0]?.count || 0;
        const totalPages = Math.ceil(postsCount / limit);

        console.log(totalPages, page);
        if (totalPages < page) {
            page = 1;
            skip = (page - 1) * limit;
        }

        const blogPosts = await BlogPost.aggregate([
            match,
            {$sort: {createdAt: 1}},
            {
                $lookup: {
                    from: 'blogComments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            },
            {
                $addFields: {
                    commentsCount: {$size: '$comments'},
                    formattedDate: {
                        $dateToString: {
                            format: '%B %d, %Y',
                            date: '$createdAt',
                            timezone: 'UTC',
                        }
                    }
                }
            },
            {
                $project: {
                    title: 1,
                    banner: 1,
                    content: 1,
                    formattedDate: 1,
                    commentsCount: 1,
                    name: 1
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);
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
            blogPosts,
            totalPages,
            currentPage: page
        });
    }
}

export default BlogController;