import React,{useState} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'
const SignUp=()=>{
  const history=useHistory()
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const PostData=(e)=>{
    console.log('executed')
    
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
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
        M.toast({html: data.message,classes:"#00c853 green accent-4"})
        history.push('/login')

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
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2"
        onClick={()=>PostData()}>Register</button>
       
        <p><Link to="/login">Already have an account? Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp