import React,{useState} from 'react'
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'
import './Register.css'


const Register = () => {
  const[user,setUser]=useState({
    name:'',
    email:'',
    phone:'',
    password:'',
  })
  const navigate=useNavigate();
  const generateError=(err)=>{toast.error(err,{
    position:'top-center',

  })
}
  console.log(user);
  const handleSubmitt=async(d)=>{
    d.preventDefault()
    try {
      const {data}=await axios.post('http://localhost:4000/register',{
        ...user,
      },{
        withCredentials:true,
      })
      if(data){
        if(data.errors){
          const {name,email,phone,password}=data.errors
          if(name)generateError(name);
          else if(email)generateError(email);
          else if(password)generateError(password);
          else if(phone)generateError(phone);

        }else{
          navigate('/login')
        }
      }
      
    
    } catch (error) {
      console.log(error,"register error problem");
    }
    

  }
  return (
    <div className='register'>
    <div className='auth-form-container'>
        <h1>Signup</h1>
      <form className='register-form'onSubmit={handleSubmitt}>
      <label htmlFor="username">UserName</label>
      <input  type="text" onChange={(e) =>setUser({ ...user, name: e.target.value })}placeholder='enter your name' id="username" name='name' required/>
      <label htmlFor="email">Email</label>
      <input  type="text" onChange={(e) =>setUser({ ...user, email: e.target.value })}placeholder='enter your email' id="email" name='email'  required/>
      <label htmlFor="phone">Phone</label>
      <input type="tel" onChange={(e) =>setUser({ ...user, phone: e.target.value })}placeholder='enter your phoneno:'  id="phone" name='phone'  required/>
      <label htmlFor="password">Password</label>
      <input type="password" onChange={(e) =>setUser({ ...user, password: e.target.value })} placeholder='enter your password' id='password' name='password'  required/>
      <button type='submit'>Signup</button>
      <ToastContainer/>
      </form>
      <button className='link-btn'>Already  have a account?<Link to='/login'>Login here</Link></button>
   

    </div>
    </div>
  )
}

export default Register