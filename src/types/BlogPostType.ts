import { InferSchemaType } from 'mongoose';
import BlogPost from '../models/BlogPost';

type BlogPostType = InferSchemaType<typeof BlogPost>

export default BlogPostType;