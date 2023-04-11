import React,{useEffect} from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import axios from 'axios'
import { useCookies } from "react-cookie";

const Profile=()=>{
  const user=useSelector((state)=>state.user)
  const [cookie,setCookie,removeCookie]=useCookies([])

const navigate=useNavigate()
useEffect(() => {
   
  const checkUser = async () => {
    if (!cookie.jwt) {
      navigate("/login");
    } else {
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      if (!data.status) {
        removeCookie("jwt");
        navigate("/login");
      }
    }
  };

  checkUser();
}, [cookie, navigate, removeCookie]);

    return(
<div className="container">
      <div className="profileContainer">
        <div className="image">
          <img
            src={
              user.image?`http://localhost:4000/${user.image}` :''
            }
            alt="Profile"
          />
        </div>
        <div className="details">
          <h3 className="content">Name :{user.name}</h3>
          <h5 className="content">Email:{user.email}</h5>
          <h6 className="content">Phone:{user.phone}</h6>
          
         
        </div>
        <div>
          
          <button className="hh"
              onClick={() => {
                navigate("/updateProfile");
              }}
          >
            Change image
          </button>
          <button
           onClick={() => {
            navigate("/");
          }}
           
          >
            Back To Home
          </button>
         
        </div>
      </div>
    </div>

  )
}
export default Profile