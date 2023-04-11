const jwt=require('jsonwebtoken')
const AdminModel=require('../Model/AdminModel')
module.exports.verifyAdmin=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token, 'secret key', async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
              } else {
                const admin = await AdminModel.findById(decodedToken.id);
                if (admin) {
                  next();
                } else {
                  res.json({ status: false });
                }
              }
            });
          } else {
            res.json({ status: false });
          }
        };
