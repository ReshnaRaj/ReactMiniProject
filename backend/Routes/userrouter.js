const router=require('express').Router();
const { register, login } = require('../Controller/auth');
const {checkUser}=require('../Middleware/authuser')
const {uploadOptions}=require('../Middleware/uploadimg')
const {updateProfile}=require('../Controller/user')
router.post('/',checkUser)
router.post('/register',register)
router.post('/login',login)
router.post(
    '/upload-image',
    checkUser,
    uploadOptions.single('image'),
    updateProfile
)
module.exports=router