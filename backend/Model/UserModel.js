const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    phone:{
        type:Number,
        required:[true,'phone is required'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
    }, 
    image:{
        type:Object,
    }

    


})
userSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
    next();
})
module.exports=mongoose.model('Users',userSchema)