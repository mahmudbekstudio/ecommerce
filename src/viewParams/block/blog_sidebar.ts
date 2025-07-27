import BlogTag from '../../models/BlogTag';
import Blog from "../../models/Blog";
let blogTags;
let blogCategories;

export default {
    blogTags: async () => {
        if (!blogTags) {
            blogTags = await BlogTag.find().sort({title: 1});
        }

        return blogTags;
    },
    blogCategories: async () => {
        if (!blogCategories) {
            blogCategories = await Blog.aggregate([
                {$sort: {title: 1}},
                {
                    $lookup: {
                        from: 'blogposts',
                        localField: '_id',
                        foreignField: 'category_id',
                        as: 'posts'
                    }
                },
                {
                    $addFields: {
                        postsCount: {$size: '$posts'}
                    }
                },
                {
                    $project: {
                        name: 1,
                        title: 1,
                        postsCount: 1
                    }
                }
            ]);
        }

        return blogCategories;
    }
};