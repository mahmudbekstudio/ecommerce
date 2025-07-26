import mongoose from 'mongoose';

const blogTagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('BlogTag', blogTagSchema);