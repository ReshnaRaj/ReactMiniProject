const jwt=require('jsonwebtoken')
const User=require('../Model/UserModel')
module.exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'secret key', async (err,decodedToken)=>{
            if(err){
                res.json({status:false})
            }
            else{
                const user=await User.findById({_id:decodedToken.id})
                if(user){
                    next();
                }
                else{
                    res.json({status:false})
                }
            }
        })
    }
    else{
        res.json({status:false})
    }
}