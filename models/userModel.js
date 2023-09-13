import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog',
        }
    ],
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User; 