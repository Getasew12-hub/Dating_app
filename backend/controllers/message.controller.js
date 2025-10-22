import { GetUsers, io } from "../config/soket.js";
import message from "../modal/message.js";
import user from "../modal/user.js";

export const getMessage=async (req,res) => {
    try {
        const {id}=req.params;
     
     const messages=await message.find({ $or:[ {senderuser:req.user._id,reciveruser:id},
            {senderuser:id,reciveruser:req.user._id}]
}).sort({createdAt:1})
     
return res.status(200).json(messages)

     
    } catch (error) {
       console.log('error on get message ',error.message);
       return res.status(500).json({error:'Internal server error'}) 
    }
}
export const sendMessage=async (req,res) => {
     
    try {

       
        const {reciveruser}=req.params;
        const {messages}=req.body;

        const addmesage=await message.create({reciveruser,senderuser:req.user._id,message:messages});
       const userreciver=await user.findOne({_id:reciveruser});
    console.log("i will get this",!userreciver.like.includes(req.user._id))
       if(!userreciver.like.includes(req.user._id)){
           userreciver.like.push(req.user._id);
           await userreciver.save();
           const matchuser={name:req.user.name,img:req.user.img}

             const socketid=await GetUsers(reciveruser);

    if(socketid){
         io.to(socketid).emit('matchfound',{id:req.user._id,name:req.user.name,user:req.user,type:"ok"});
        io.to(socketid).emit("newmessage",{addmesage});
    } 
       }else{
            const socketid=await GetUsers(reciveruser);

    if(socketid){
        io.to(socketid).emit("newmessage",{addmesage});
    } 
       }
        
  
    
        return res.status(201).json(addmesage)

    } catch (error) {
        console.log('error on send message ',error.message);
       return res.status(500).json({error:'Internal server error'})  
    }
    
}
export const removeMessage=async (req,res) => {
    try {
        const {id}=req.params;
        await message.deleteOne({_id:id});
        return res.status(200).json({message:'successfully deleted message'})
    } catch (error) {
        console.log('error on remove message',error.message);
        return res.status(500).json({error:'Internal server error'})
    }
}