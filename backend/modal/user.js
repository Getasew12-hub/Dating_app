import mongoose from "mongoose";


const usermodal=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female']
    },
    genderPreference:{
        type:String,
        required:true,
        enum:['male','female','both']
    },
    bio:{
        type:String,
        default:''
    },
    img:{type:String,default:''},
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    
    deslike:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    matcher:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    


},{timestamps:true})

const user=mongoose.model('User',usermodal);


export default user;