import React,{useEffect, useState,useContext} from 'react'
import {UserContext} from '../../../App'

const Profile=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([])
  const [image,setImage]=useState('')
  useEffect(()=>{
    fetch("/mypost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then(result=>{
      setData(result.data)
      
    })
    .catch(error=>{
      console.log(error)
    })
  },[])
  useEffect(()=>{
    if(image){
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
        
        fetch('/updatephoto',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            photo:data.url
          })
        })
        .then(res=>res.json())
        .then(result=>{
          console.log(result)
          localStorage.setItem("user",JSON.stringify({
            ...state,photo:result.photo
          }))
          dispatch({type:"UPDATEPHOTO",payload:result.photo})
        })
        })
      .catch(error=>{
        console.log(error)
      })
    }
  },[image])
  console.log(data)
  const updatePhoto=(file)=>{
    setImage(file)
  }
  return(
    
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>
        <div>
          <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src={state?state.photo:'https://res.cloudinary.com/socio/image/upload/v1590489444/nophoto_zuge3f.jpg'}
          />
        <div className="file-field input-field">
          <div className="btn #1976d2 blue darken-2">
            <span>Update Image</span>
            <input type="file" onChange={e=>updatePhoto(e.target.files[0])} required/>
          </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          </div>
        <div>
            <h4>{state?state.name:"Loading..."}</h4>
            <h6>{state?state.email:"Loading..."}</h6>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              width:'108%'
            }}>
              <h6>{data.length}</h6>
              <h6>{state?state.followers.length:'Loading...'} Followers</h6>
              <h6>{state?state.following.length:'Loading...'} Following</h6>
            </div>
        </div>
      </div>
      <div className="gallery">
            {
              data.map(item=>{
                return(
                          <img className="item" src={item.photo} key={item.postedBy._id} alt={item.postedBy.title}/>
                )
              })
            }
        
      </div>
    </div>
  )
}

export default Profile