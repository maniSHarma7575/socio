import React,{useState} from 'react'
import { Link,useHistory, useParams } from "react-router-dom";
import M from 'materialize-css'
const NewPassword=()=>{
  const history=useHistory()
  const [password,setPassword]=useState('')
  const {token}=useParams()
  const PostData=(e)=>{    
    fetch("/updatePassword",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password:password,
        token:token
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error)
      {
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      }
      else{
       
        M.toast({html: "Password Successfully Reset",classes:"#00c853 green accent-4"})
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
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #1976d2 blue darken-2">Update Password</button>
      </div>
    </div>
  )
}

export default NewPassword