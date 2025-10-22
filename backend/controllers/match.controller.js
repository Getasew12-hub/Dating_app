import user from "../modal/user.js";
import { io } from "../config/soket.js";
import { GetUsers } from "../config/soket.js";
  
export const getMatchusers=async (req,res) => {
    try {
       const users=await user.findById(req.user._id).populate('like','name img')
 
 const currentuser=await user.findById(req.user._id);
 
 const usercheckup= users.like.map((val)=>{
     const isMatch=currentuser.matcher.includes(val._id);

     return {
        ...val._doc,
        isMatch: isMatch ? 'match' :'like',
     }
    })

   const userdata= await Promise.all(usercheckup) 
   
        return res.status(200).json(userdata);
    } catch (error) {
          console.log('error on get user',error.message);

        return res.status(500).json({error:'Internal server error'})
    }
}
export const getUserPro=async (req,res) => {
    try {

        const getuser=await user.find({
            $and:[
                {_id:{$ne:req.user._id}},
                {_id:{$nin:req.user.like}},
                // {_id:{$nin:req.user.deslike}},
                {_id:{$nin:req.user.matcher}},
                {
                    gender:req.user.genderPreference=='both' ? {$in:['male','female']} :req.user.genderPreference
            
            
                  },
               {
                genderPreference:{$in:[req.user.gender,'both']}
               }

            ]
        })
        return res.status(200).json(getuser)
    } catch (error) {
           console.log('error on swipe right',error.message);

        return res.status(500).json({error:'Internal server error'}) 
    }
}
export const swipeRight=async (req,res) => {
    try {
     
        const {id}=req.params;
    const currentuser=await user.findById(req.user._id);
if(!currentuser.deslike.includes(id)){
currentuser.deslike.push(id);
await currentuser.save();
}
    
      return res.status(201).json({user:currentuser})
    } catch (error) {
        console.log('error on swipe right',error.message);

        return res.status(500).json({error:'Internal server error'})
    }
}


export const swipeLeft=async (req,res) => {
   
    try {
        const {id}=req.params;
        console.log(id)
        
        const getuser=await user.findById(id);
        const currentuser=await user.findById(req.user._id);
    
     
        if(!currentuser.like.includes(id)){
             currentuser.like.push(id);

             await currentuser.save()
            
              if(getuser.like.includes(currentuser._id)){
                
                getuser.matcher.push(currentuser._id)
                currentuser.matcher.push(id)
          await getuser.save();
               await currentuser.save();
           
            const usermatch=await GetUsers(id);
         const usersendmatch=await GetUsers(currentuser._id);
                if(usermatch){
                    const name=currentuser.name;
                io.to(usermatch).emit('matchfound',{id,name,user:currentuser});
               }
               
               if(usersendmatch){
                
                 io.to(usersendmatch).emit('matchfound',{id:currentuser._id,name:getuser.name,user:getuser});
               }
              }
           
        }

        return res.status(200).json(currentuser)
        
    } catch (error) {
        console.log('error on swipe left',error.message);
        return res.status(500).json({error:'Internal server error'})
    }
}