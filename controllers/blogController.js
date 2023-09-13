import mongoose from 'mongoose';
import blogModel from '../models/blogModel.js'
import User from '../models/userModel.js';




//POST the blog(Create the blog)...
export async function createBlog(req, res) {

    try {

        const { title, description, image, userId } = await req.body;

        //Validation if any of the field not present...
        if (!title || !description || !image || !userId) {
            return res.status(401).send({
                success: false,
                message: "All fields are required !!",
            })
        }

        const existingUser = await User.findById(userId);
        //user validation(found or not found)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User is not found with id !!"
            })
        }

        //save the blog
        const blogContent = new blogModel({
            title,
            description,
            image,
            userId,
        });


        //Before saving this blog to database we will ensure which user has created this blog and save this blog with that user...
        const session = await mongoose.startSession();
        session.startTransaction();
        await blogContent.save({ session });
        existingUser.blogs.push(blogContent);
        await existingUser.save({ session });
        await session.commitTransaction();


        await blogContent.save();

        return res.status(200).send({
            success: true,
            message: "New blog created successfully..",
            blogContent,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in creating the blog !!",
            error,
        })
    }

}




//Get-All blog data...
export async function getAllBlogs(req, res) {
    let blogData = [];

    try {

        blogData = await blogModel.find().populate('userId');

        //if no blog found
        if (!blogData) {
            return res.status(200).send({
                success: false,
                message: "No blogs found",
            })
        }

        console.log("Get request fulfilled");

        //else blog found
        return res.status(200).send({
            success: true,
            message: "All blogs found successfully",
            blogCount: blogData.length,
            blogData,
        })


    } catch (error) {

        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting all the blogs",
            error,
        })

    }

}




//Update the blogs...
export async function updateBlog(req, res) {

    try {

        const { id } = req.params;
        const { title, description, image } = await req.body;

        //updating the blog in the database blogModel..
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Blog Updated succesfully...",
            updateBlog,
        })

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error while updating data !!",
            error,
        })
    }

}




//Single blog detail
export async function getBlogByID(req, res) {
    let requiredBlog = [];

    try {

        const { id } = req.params;
        requiredBlog = await blogModel.findById(id);
        //If blog not found
        if (!requiredBlog) {
            return res.status(401).send({
                success: false,
                message: "Required blog not found..."
            })
        }
        //else if blod found..
        return res.status(200).send({
            success: true,
            message: "Required blog found successfully...",
            requiredBlog,
        })

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Error in getting required blog !!",
            error,
        })
    }

}




//Delete blog
export async function deleteBlog(req, res) {

    try {

        //to delete the blog
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('userId');
        //to delete that blog from the user to whom this blog associated...
        await blog.userId.blogs.pull(blog);
        await blog.userId.save();

        // console.log("Deleted successfully....")

        return res.status(201).send({
            success: true,
            message: "Deleted successfully..."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting the particular blog !!",
            error,
        })
    }

}




//Get all the blogs associated with the particular user
export async function blogAssociatedWithUser(req, res) {

    let userBlog = []

    try {
        userBlog = await User.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error,
        });
    }

};