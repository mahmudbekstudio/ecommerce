import blog_sidebar from './block/blog_sidebar';

export default {
    views: {
        blog: () => {
            return [
                'block.blog_sidebar',
            ]
        },
        'blog-post': () => {
            return [
                'block.blog_sidebar',
            ]
        }
    },
    block: {
        blog_sidebar
    }
}