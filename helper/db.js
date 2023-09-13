//To establish a collection with the mongoDB database..............

import mongoose from "mongoose"
import colors from 'colors'

export const connectDb = async () =>{

    try{

        const {connection} =  await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName: "blogging_website_database"
        })
        console.log("Mongo connected succesfully....")
        console.log("connected with the host :-",connection.host);
        
    }catch{

        console.log("Mongo failed to connect..".bgRed.white);
        console.log(error)

    }
}

