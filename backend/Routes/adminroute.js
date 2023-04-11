const router=require('express').Router();
const {adminLogin,allUsers,
    deleteUser,
    editUser,
    addUser, } = require('../Controller/admin');
const {verifyAdmin}=require('../Middleware/authadmin')


router.post('/adlogin',adminLogin)
router.get("/userlist", verifyAdmin, allUsers);
router.delete("/delete-user/:userId", verifyAdmin, deleteUser);
router.put("/edit-user", verifyAdmin, editUser);
router.post("/add-user", verifyAdmin, addUser);

module.exports=router