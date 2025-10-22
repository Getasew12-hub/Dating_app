import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    senderuser:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    reciveruser:{
           type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true});


const message= mongoose.model('Message',messageSchema);

export default message;