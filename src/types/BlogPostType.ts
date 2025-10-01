import { InferSchemaType } from 'mongoose';
import BlogPost from '../models/BlogPost';

type BlogPostType = InferSchemaType<typeof BlogPost.schema>

export default BlogPostType;