import mainConfig from "../configs/main";
import Blog from "../models/Blog";
import BlogTag from '../models/BlogTag';
import BlogPost from "../models/BlogPost";

class BlogPostService
{
    public categoryName: string;
    public tagName: string;
    public limit: number;
    private skip: number;
    private status: boolean;
    private blog: any;

    constructor(public page: number = 1) {
        this.limit = mainConfig.pagination.count;
        this.skip = (this.page - 1) * this.limit;
    }

    setCategoryName(name: string) {
        this.categoryName = name;
    }

    setTagName(name: string) {
        this.tagName = name;
    }

    setStatus(status: boolean) {
        this.status = status;
    }

    private async getMatch() {
        const match = {$match: {status: this.status}};

        if (this.categoryName) {
            if (!this.blog || this.blog.name !== this.categoryName) {
                this.blog = await Blog.findOne({name: this.categoryName});

                if (!this.blog) {
                    throw Error('Blog not found');
                }
            }

            match.$match.category_id = this.blog._id;
        }

        if (this.tagName) {
            if (!this.blog || this.blog.name !== this.categoryName) {
                this.blog = await BlogTag.findOne({name: this.tagName});

                if (!this.blog) {
                    throw Error('Blog tag not found');
                }
            }

            match.$match.tag_ids = this.blog._id;
        }

        return match;
    }

    async getTotalPage() {
        const countTotal = await BlogPost.aggregate([
            await this.getMatch(),
            { $count: 'count' }
        ]);
        const postsCount = countTotal[0]?.count || 0;
        const totalPages = Math.ceil(postsCount / this.limit);

        if (totalPages < this.page) {
            this.page = 1;
            this.skip = (this.page - 1) * this.limit;
        }

        return totalPages;
    }

    public getBlog() {
        return this.blog;
    }

    public async getBlogPosts() {
        return await BlogPost.aggregate([
            await this.getMatch(),
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
            { $skip: this.skip },
            { $limit: this.limit }
        ]);
    }
}

export default BlogPostService;