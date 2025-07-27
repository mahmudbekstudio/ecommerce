import Controller from "../Controller";
import { Request, Response } from "express";
import BlogPost from '../../models/BlogPost';
import Blog from '../../models/Blog';
import mainConfig from '../../configs/main';

class BlogController extends Controller
{
    public title = 'Blog';
    public view = 'blog';
    async handle(req: Request, res: Response): Object {
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

        if (totalPages < page) {
            page = 1;
            skip = (page - 1) * limit;
        }

        const blogPosts = await BlogPost.aggregate([
            match,
            {$sort: {createdAt: 1}},
            {
                $lookup: {
                    from: 'blogcomments',
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

        return {
            title: this.title,
            blogPosts,
            totalPages,
            currentPage: page,
            blogName,
        };
    }
}

export default BlogController;