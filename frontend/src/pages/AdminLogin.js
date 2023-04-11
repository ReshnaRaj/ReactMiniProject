import React from 'react'
import Login from '../components/Login/Login'

const AdminLogin = () => {
  return (
    <div>
        <Login admin={true} />
    </div>
  )
}

export default AdminLogin