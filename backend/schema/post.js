import mongoose from 'mongoose';

const PostModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ImageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Posts', PostModel);
