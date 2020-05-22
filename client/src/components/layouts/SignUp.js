import React from 'react'
import { Link } from "react-router-dom";
const SignUp=()=>{
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password"/>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">Register</button>
        <p><Link to="/login">Already have an account? Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp