import { v2 as cloudinary } from 'cloudinary';
import user from '../modal/user.js';

export const updateProfile=async (req,res) => {

    try {
        const {name,gender,preferece,age,bio}=req.body;
        let {img}=req.body;

        if(img && img!=req.user.img){
           if(req.user.img){
            
            await cloudinary.uploader.destroy(req.user.img.split('/').pop().split('.')[0]);
           }
            const uploadImag=await cloudinary.uploader.upload(img,{folder:'dating_app'});
            img=uploadImag.secure_url;

        }

      const updateInfo=await user.findByIdAndUpdate(req.user._id,{name,gender,genderPreference:preferece,age,bio,img},{new:true})

      return res.status(201).json({user:updateInfo})
    } catch (error) {
        console.log('error on update profile',error.message);
        return res.status(500).json({error:'Internal server error'});
    }
}