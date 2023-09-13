import express from "express";
import { getAllBlogs , createBlog , updateBlog , getBlogByID , deleteBlog , blogAssociatedWithUser } from "../controllers/blogController.js";

//router object from the express
const router = express.Router();


//GET-ALL API || get all blogs
router.get('/all-blogs' , getAllBlogs);


//POST blogs || Create the blog and save it to database
router.post('/post-blog' , createBlog);


//PUT || Update the blog data
router.put('/update-blog/:id' , updateBlog);


//GET one blog || Single blog detail
router.get('/get-blog/:id' , getBlogByID);


//DELETE || delete-blog
router.delete('/delete-blog/:id' , deleteBlog);


//GET || get the blogs of the particular user
router.get('/user-blog/:id' , blogAssociatedWithUser);


//export
export default router;