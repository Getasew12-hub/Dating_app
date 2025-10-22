
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import env from "dotenv";
import express from "express";
import user from "../modal/user.js";
import jwt from "jsonwebtoken"
env.config()



const router=express.Router()
router.get("/google",passport.authenticate('google',{scope: ['profile','email']}))

router.get('/google/callback',  passport.authenticate('google', {
    session:false,
    failureRedirect:process.env.FAILD_URL, 
}),
 async function(req, res) {
    await generateToken(res,req.user._id);
    res.redirect(process.env.FRONTEND_URL);
  });





  passport.use("google",new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/authgoogle/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
//    await GoogleAuth(profile)
       const getuser=await user.findOne({email:profile.emails[0].value});
       console.log("the response data is this",getuser)
       if(!getuser){
        console.log(profile.displayName,profile.emails[0].value)
        
        const newuser=await user.create({name:profile.displayName,email:profile.emails[0].value,gender:'male',age:'21',genderPreference:'both',password:'google'});
  
      return cb(null, newuser);
       }else{
  
      return cb(null, getuser);
       }

     
  
  }
));


const generateToken=(res,userid)=>{
  const token=jwt.sign({id:userid},process.env.TOKEN_KEY,{expiresIn:'7d'});

    res.cookie('dateToken',token,{
       httpOnly:true,
       sameSite:'strict',
       secure:process.env.NODE_ENV=='production',
       maxAge:1000*60*60*24*7,

    })
  
}


export default router;