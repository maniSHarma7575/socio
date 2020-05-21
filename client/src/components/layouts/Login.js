import React from 'react'

const Login=()=>{
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password"/>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">Login</button>
      </div>
    </div>
  )
}

export default Login