import React,{useState,useEffect} from 'react'
import { Link,useHistory } from "react-router-dom";
import M from 'materialize-css'

const CreatePost=()=>{
  const history=useHistory()
  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  const [image,setImage]=useState('')
  const [url,setUrl]=useState('')
  useEffect(()=>{
    if(url)
    {
      fetch("/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title:title,
          body:body,
          image:url
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
          M.toast({html: "Post Upload success",classes:"#00c853 green accent-4"})
          history.push('/')
  
        }
      })
      .catch(error=>{
        console.log(error)
      })
    }
  },[url])
  const postDetails=()=>{
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

  return(
    <div className="card input-field"
    style={{
      margin:"30px auto",
      maxWidth:"500px",
      padding:"20px",
      textAlign:"center"
          }}>
      <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
      <input  type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} required/>
      <div className="file-field input-field">
        <div className="btn #1976d2 blue darken-2">
        <span>Upload File</span>
        <input type="file" onChange={e=>setImage(e.target.files[0])} required/>
        </div>
        <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
      </div>
      <button onClick={()=>postDetails()}className="btn waves-effect waves-light #1976d2 blue darken-2">Add Post</button>
    </div>
  )
}

export default CreatePost