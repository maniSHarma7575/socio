import React,{useState,useEffect} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'
const SignUp=()=>{
  const history=useHistory()
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [image,setImage]=useState('')
  const [url,setUrl]=useState('')

  useEffect(()=>{
    if(url)
    {
      uploadFields();
    }
  },[url])
  const uploadPic=()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","socio-clone")
    data.append("cloud_name","socio")
    fetch("https://api.cloudinary.com/v1_1/socio/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const uploadFields=()=>{
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password,
        photo:url
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
  const PostData=()=>{
    if(image)
    {
      uploadPic()
    }
    else{
      uploadFields();
    }
  }
  return(
    <div className="mycard">
      <div className="card auth-card ">
        <h2>Socio</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <div className="file-field input-field">
        <div className="btn #1976d2 blue darken-2">
        <span>Upload Image</span>
        <input type="file" onChange={e=>setImage(e.target.files[0])} required/>
        </div>
        <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className="btn waves-effect waves-light #1976d2 blue darken-2"
        onClick={()=>PostData()}>Register</button>
       
        <p><Link to="/login">Already have an account? Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp