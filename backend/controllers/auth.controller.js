import user from "../modal/user.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken=(res,userid)=>{
  const token=jwt.sign({id:userid},process.env.TOKEN_KEY,{expiresIn:'7d'});

    res.cookie('dateToken',token,{
       httpOnly:true,
       sameSite:'strict',
       secure:process.env.NODE_ENV=='production',
       maxAge:1000*60*60*24*7,

    })
  
}

export const Signup=async (req,res) => {

  try {
    const {name,email,password,age,gender,preferece}=req.body;

    if(!name || !email || !password || !age || !gender || !preferece) return res.status(400).json({error:'All input is required'});
    if(password?.length<6) return res.status(400).json({error:'Password needed at list 6 charactures'})

        if(age<18)return res.status(400).json({error:'You must be at list 18 year old'})
    const getuser=await user.findOne({email});
        
        if(getuser) return res.status(400).json({error:'User already exist please try to login'})
          const hashpassword=await bcrypt.hash(password,10)
            const newuser=await user.create({
                name,
                email,
                password:hashpassword,
                age,
                gender,
                genderPreference:preferece

            })
     
   await generateToken(res,newuser._id);

   
   return res.status(201).json({user:newuser})
  } catch (error) {
    console.log("error on singup",error)
    return res.status(500).json({error:'Internal server error'})

  }
}
export const Login=async (req,res) => {
  
   try {
    const {email,password}=req.body;

    if(!email || !password) return res.status(400).json({error:'Incorrect input,all input is required'})

      const getuser=await user.findOne({email});

      if(!getuser) return res.status(400).json({error:'Incorrect email'})
       
        const checkPassword=await bcrypt.compare(password,getuser.password)

        if(!checkPassword) return res.status(400).json({error:'Incorrect password'})

          await generateToken(res,getuser._id);

          return res.status(200).json({user:getuser});
   } catch (error) {
    console.log('error on login ',error.message);

    return res.status(500).json({eror:'Internal server error'})
   }
}
export const Logout=async (req,res) => {
    res.clearCookie('dateToken')

    return res.status(200).json({message:'Successfully logout'})
}


export const checkAuth=async (req,res) => {
  try {
    return res.status(200).json({user:req.user})
  } catch (error) {
    console.log('error on check auth',error.message);

    return res.status(500).json({error:'Internal server error'})
  }
}


