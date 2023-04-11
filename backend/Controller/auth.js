const UserModel = require("../Model/UserModel");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const maxtime= 3*24*60*60
const createtoken=(id)=>{
    return jwt.sign({id},'secret key',{
        expiresIn:maxtime,
    })

}
const handleErrors=(err)=>{
    let errors={email:"",password:""}

if(err.code===11000){
    errors.email="This email is already registered"
    return errors
}
if(err.message.includes('users validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message
    })
}return errors
}
module.exports.register=async (req,res,next)=>{
    
    try {
        console.log("register page working")
        const {name,email,phone,password}=req.body;
        const user=await UserModel.create({name,email,phone,password})
        const token=createtoken(user._id)
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxtime: maxtime * 1000,
          });
          console.log(req.body)
          res
          .status(201)
          .json({ user:{id:user._id,email:user.email},created: true });
    } catch (error) {
        
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
    }
};
module.exports.login=async (req,res,next)=>{
   
    try {
        console.log("login page")
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            const auth=await bcrypt.compare(password,user.password)
            if(auth){
                const token=createtoken(user._id)
              res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxtime: maxtime * 1000,
          });
        
          res
          .status(200)
          .json({ user,token,created: true });
        } else {
            const errors={password:"password is incorrect"}
            res.json({errors,created:false})
        }
    }
    else {
        const errors = { email: "No user with the entered mail id" };
        res.json({ errors, created: false });
      }
    }
  catch (error) {
        
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
    }

};
