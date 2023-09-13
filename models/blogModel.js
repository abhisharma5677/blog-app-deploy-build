import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'description required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required..'],
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require:[true , 'user id is required'],
    },
},
    { timestamps: true }
);

const blog = mongoose.model("Blog", blogSchema);

export default blog;