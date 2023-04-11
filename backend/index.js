const express=require('express')
const app=express()
const userrouter=require('./Routes/userrouter')
const adminrouter=require('./Routes/adminroute')
const cors=require('cors')
const dbConnection=require('./Connection/database')
const logger=require('morgan')
const path=require('path')
const cookieparser=require('cookie-parser')

const bodyparser=require('body-parser')
dbConnection();
app.listen(4000,()=>{
    console.log("server started on port 4000")
})


app.use(cors({
    origin:['http://localhost:3000'],
    method:['GET','POST','DELETE','PUT'],
    credentials:true
})
)
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
app.use(cookieparser())
app.use(bodyparser.json())
app.use('/',userrouter)
app.use('/admin',adminrouter)


