const UserModel=require('../Model/UserModel')


const updateProfile=async(req,res)=>{
    console.log(req.file,"start");
    req.file.path = await req.file.path.replace('public','')
    console.log(req.file.path,"hhhhhhhh");
    // console.log(req.headers);
    let users=await UserModel.findOne({_id:req.headers.userid})
 
    if(users){
        await UserModel.findByIdAndUpdate(req.headers.userid,{
            $set:{
                image:req.file,
            }
        })
        let user=await UserModel.findOne({_id:req.headers.userid})
        res.json({message:"image uploaded successfully",user,status:true})
    }
}
module.exports={updateProfile}