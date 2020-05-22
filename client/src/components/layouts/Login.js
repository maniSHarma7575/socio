import React from 'react'
import { Link } from "react-router-dom";

const Login=()=>{
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password"/>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">Login</button>
        <p><Link to="/register">Don't have an account? Register</Link></p>

      </div>
    </div>
  )
}

export default Login