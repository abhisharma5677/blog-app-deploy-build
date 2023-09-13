import User from '../models/userModel.js';
import bcrypt from 'bcrypt';



//post user information || registerController || POST
export async function postUserData(req , res){

    try{

        const{ username , email , password } = req.body;

        //Applying validation
        if(!username || !email || !password){
            return res.status(400).send({
                message:"Please fill all the fields",
                success:false,
            })
        }

        //Handling already existing user || on the basis of email
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User already registered try another email",
            })
        }


        //hashing the password before sending to the database..
        const hashedPassword = await bcrypt.hash(password , 10); 


        //After all the validations save the data to the database..
        const userData = new User({
            username,
            email,
            password:hashedPassword,
        });

        await userData.save();

        return res.status(201).send({
            success:true,
            message:"New user created..",
            userData,
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Error in the register callback !!",
            success: false,
            error,
        })
    }

}



//get all users || GET
export async function getAllUser(req , res){

    let userData = [];

    try{

        userData = await User.find();
        return res.status(201).send({
            userCount: userData.length,
            message:"All Data get successfully...",
            success:true,
            userData,
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting all the users !!",
            error,
        });
    }

}



//handle login || loginController || POST
export async function loginInfo(req , res){

    try{

        const{ email , password } = req.body;
        
        //Validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"Enter correct username or password !!"
            })
        }

        //Check if the provided email is present or not 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send({
                success:false,
                message:"Email is not registered..",
            })
        }

        //Check if provided password is correct or not...
        const passwordMatch = await bcrypt.compare(password , user.password);
        if(!passwordMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid email or password !!",
            })
        }

        //Now everything is alright, so we can return user..
        return res.status(200).send({
            success:true,
            message:"Login Successfully...",
            user,
        })


    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in login callback...",
            error,
        })
    }

}