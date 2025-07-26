import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    banner: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    tag_ids: {
        type: Array,
        default: []
    },
}, { timestamps: true });

export default mongoose.model('BlogPost', blogPostSchema);