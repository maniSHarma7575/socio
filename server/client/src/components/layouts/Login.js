import React,{useState,useContext} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'
import {UserContext} from '../../App'
const Login=()=>{
  const {state,dispatch}=useContext(UserContext)
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
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #1976d2 blue darken-2">Login</button>
        <div className="col s12 m6 offset-m3 center-align" style={{marginTop:"7px"}}>
          <Link className="oauth-container btn darken-4 white black-text" to="/google-oauth" style={{textTransform:"none"}}>
              <div className="left">
                  <img width="20px" style={{marginTop:"7px",marginBottom:"8px"}} alt="Google sign-in" 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
              </div>
              Login with Google
          </Link>
        </div>
        <p><Link to="/register">Don't have an account? Register</Link></p>
        <h6><Link to="/reset">Forgot Password ?</Link></h6>


      </div>
    </div>
  )
}

export default Login