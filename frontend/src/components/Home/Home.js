import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/userSlice";

import axios from 'axios'

const Home=()=>{
    const dispatch = useDispatch();
    const[cookie,setCookie,removeCookie]=useCookies([])
    const navigate=useNavigate()
    
    useEffect(()=>{
        const checking=async ()=>{
            if(!cookie.jwt){
                navigate('/login')
            }
            else{
                const {data}=await axios.post('http://localhost:4000',{},{
                    withCredentials:true

                })
                if(!data.status){
                    removeCookie('jwt')
                    navigate('/login')
                }
                else{

                }
            }
        }
        checking();
    },[cookie,navigate,removeCookie])
    const logOut = () => {
        dispatch(
          setUserDetails({
            name: null,
            id: null,
            image: null,
            phone: null,
            email: null,
            token: null,
          })
        );
        removeCookie("jwt");
        navigate("/login");
      };
  
 

    return(
        <div>
            <h1 style={{'textAlign':'center','marginTop':'100px'}}>Welcome to home page</h1>
            
            <button style={{'marginLeft':'590px','marginTop':'100px','backgroundColor':'black'}} onClick={()=>navigate('/profile')}>Go to profile</button>
            <button style={{'marginLeft':'30px','marginTop':'100px','backgroundColor':'black'}} onClick={logOut}>Logout</button>
        
        </div>
    )
    }
export default Home