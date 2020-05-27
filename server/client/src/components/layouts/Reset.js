import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
const ResetPassword=()=>{
  const history=useHistory()
 
  const [email,setEmail]=useState('')
  const PostData=(e)=>{
    console.log('executed')
    
    fetch("/resetLink",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
       
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
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <button onClick={()=>PostData()} className="btn waves-effect waves-light #1976d2 blue darken-2">Reset Password</button>

      </div>
    </div>
  )
}

export default ResetPassword