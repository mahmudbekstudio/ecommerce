import mongoose from 'mongoose';

const blogCommentSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export default mongoose.model('BlogComment', blogCommentSchema);