import user from "../modal/user.js";
import jwt from "jsonwebtoken"

export const protecter=async (req,res,next) => {
    try {

        const getcookie= req.cookies.dateToken;
        
        if(!getcookie)  return res.status(401).json({error:'Invalid credintial'})
        const decode=jwt.verify(getcookie,process.env.TOKEN_KEY);

        if(!decode) return res.status(401).json({error:'Invalid creadintial'})
            const getuser=await user.findOne({_id:decode.id});

        if(!getuser) return res.status(401).json({error:'Invalid creadintial'});

        req.user=getuser;

        next()

    } catch (error) {
        
        console.log('error on protecter',) 
        if(error instanceof jwt.JsonWebTokenError){
         return res.status(401).json({error:error.message || "Inalid creadintial"})
        }else{
            return res.status(500).json({error:'Internal server error'})
        }
        
    }
}