const multer=require('multer')
const FILE_TYPE= {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/webp": "webp",
  };
  const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid=FILE_TYPE[file.mimetype]
        let upload=new Error('invalid image type')
        if(isValid){
            upload=null;
        }
        cb(upload,'./public/images')

    },
    filename:function(req,file,cb){
        cb(null,`$Date.now()}-${file.originalname}`)
    },
  })
  const uploadOptions=multer({storage:storage})
  module.exports={uploadOptions}