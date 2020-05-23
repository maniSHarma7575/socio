import React,{useEffect, useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([])
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
  console.log(data)
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
            src="https://cdn.pixabay.com/photo/2015/01/12/10/44/portrait-597173_960_720.jpg"
          />
        </div>
        <div>
            <h4>{state?state.name:"Loading..."}</h4>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              width:'108%'
            }}>
              <h6>40posts</h6>
              <h6>40followers</h6>
              <h6>40following</h6>
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