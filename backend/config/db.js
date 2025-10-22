import mongoose, { mongo } from "mongoose";
import env from "dotenv";
env.config()
 
export const conneDb=async () => {
    try {
        const conn=await mongoose.connect("mongodb+srv://geach9007_db_user:KYdmcpeQnjv17tg7@cluster0.mwhbxlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongo db connected host is: "+conn.connection.host)
    } catch (error) {
        console.log('Faild connect to mongodb',error)
        process.exit(1)
         
        
    }
}



