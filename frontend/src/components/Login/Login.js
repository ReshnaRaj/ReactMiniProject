import React,{useState,useEffect} from 'react'
import axios from 'axios'
// import {useCookies} from 'react-cookie'
import {ToastContainer,toast} from 'react-toastify'
import './Login.css'
import {useDispatch,useSelector} from 'react-redux'
import { setUserDetails} from '../../redux/userSlice'
import {setAdminDetails} from '../../redux/adminSlice'
import { Link,useNavigate } from 'react-router-dom'
const Login = ({admin}) => {
  const users=useSelector((state)=>state.user);
  const admins=useSelector((state)=>state.admin);
  const dispatch=useDispatch()
  const navigate=useNavigate();
  // const [errors,setErrors] = useState("");
  const[user,setUser]=useState({
    email:'',
    password:'',
  })
  
 console.log(users,"users taking the data from the store");
  // const[cookies]=useCookies([])
  useEffect(() => {
    // if(cookies.token)
    if (users.token) {
      console.log("usersss");
      navigate("/");
    }
    
    if(admin && admins.token){
      console.log(admins.token,"admin data coming")
      navigate('/admin/home')
    }
  },[]);
  console.log(users,"user coming")
  const generateError=(err)=>{toast.error(err,{
    position:'top-center',

  })
}

  const handleSubmitt= async(e)=>{
      e.preventDefault()
      if(!user.email){
        generateError('email is required')
        return
      }
      if(!user.password){
        generateError('password is required')
        return
      }
      try{
        if(!admin){
          var {data}=await axios.post('http://localhost:4000/login',{
            ...user
          },{
            withCredentials:true
          })
        } else{
          var {data}=await axios.post('http://localhost:4000/admin/adlogin',{
            ...user,
          },{
            withCredentials:true}
          )
        }
        console.log(data,"admin email and password")
      if(data){
        console.log(data,"data coming");
        if(data.errors){
          const {email,password}=data.errors
          if(email)generateError(email);
          else if(password)generateError(password);
        }else{
          if(!admin){
            dispatch(setUserDetails({
              name:data.user.name,
              id:data.user._id,
              email:data.user.email,
              phone:data.user.phone,
              token:data.token,
              image:data.user.image.path
              

            }))
            navigate('/')
          }else{
            dispatch(setAdminDetails({
              email:data.admin.email,
              token:data.token
            }))

            navigate('/admin/home')
          }
        //  navigate('/')
        //  console.log("home page")
        }
      }
    } catch (error) {
      console.log(error,"login error");
    }
   

  }
  return (
    <div className='login'>
    <div className='auth-form-container'>
   
    <form className='login-form' onSubmit={handleSubmitt}>
      <label htmlFor="email">Email</label>
      <input type="email" onChange={(e) =>setUser({ ...user, email: e.target.value })}placeholder='enter your email' id="email" name='email' />
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) =>setUser({ ...user, password: e.target.value })} placeholder='enter your password' id='password' name='password' />
      <button type='submit'>Login</button>
    </form>{
      admin ? '' : <button className='link-btn'>Don't have a account?<Link to='/register'>Register</Link></button>
    }
    
   
    
   <ToastContainer/>
    </div>
    </div>
  )
}

export default Login