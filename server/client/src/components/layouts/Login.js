import React,{useState,useContext, useEffect} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'
import {UserContext} from '../../App'
import GoogleLogin from 'react-google-login';
const Login=()=>{
 
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [oauthProvider,setoauthProvider]=useState(undefined)
  useEffect(()=>{
    if(oauthProvider)
    {
    PostData()
    }
  },[oauthProvider])
  const PostData=(e)=>{
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
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html: "SignIn successfull",classes:"#00c853 green accent-4"})
        history.push('/')
      }
    })
    .catch(error=>{
      console.log(error)
    })
    
  }
  const responseGoogle = (response) => {
    console.log(response.profileObj)
    console.log(response.profileObj.email,response.profileObj.googleId);
      setEmail(response.profileObj.email)
      setPassword(response.profileObj.googleId)
      setoauthProvider('google')
  }
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="email" placeholder="Email" value={oauthProvider?'':email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={oauthProvider?'':password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #1976d2 blue darken-2">Login</button>
        <GoogleLogin
        clientId="1090694937783-469boou87u6gjjk0eflqeh513qnhugog.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        <p><Link to="/register">Don't have an account? Register</Link></p>
        <h6><Link to="/reset">Forgot Password ?</Link></h6>
      </div>
    </div>
  )
}

export default Login