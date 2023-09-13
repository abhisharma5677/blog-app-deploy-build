import express from "express";
import { getAllUser , postUserData , loginInfo } from '../controllers/userController.js';


//get router object from the express
const router = express.Router();


//Create Get-ALL API route || GET
router.get('/all-user', getAllUser);


//Create Post API route || POST
router.post('/register',postUserData);


//Creste Login-Info POST API route || POST
router.post('/login' , loginInfo);


//export
export default router;