import React,{useState} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'

const Login=()=>{
  const history=useHistory()
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const PostData=(e)=>{
    console.log('executed')
    
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      }
      else{
        M.toast({html: "SignIn successfull",classes:"#00c853 green accent-4"})
        history.push('/')

      }
    })
    .catch(error=>{
      console.log(error)
    })
    
  }
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #1976d2 blue darken-2">Login</button>
        <p><Link to="/register">Don't have an account? Register</Link></p>

      </div>
    </div>
  )
}

export default Login