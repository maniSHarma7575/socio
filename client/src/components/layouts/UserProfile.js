import React,{useEffect, useState,useContext} from 'react'
import {UserContext} from '../../App'
import { useParams } from 'react-router-dom'

const Profile=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [userProfile,setProfile]=useState(null)
  const {userid}=useParams()
  const [showfollow,setShowfollow]=useState(state?!state.following.includes(userid):true)
  console.log(userid)
  useEffect(()=>{
    fetch(`/user/${userid}`,{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      setProfile(result)

      
    })
    .catch(error=>{
      console.log(error)
    })
  },[])

  const followUser=()=>{
    fetch('/follow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    })
    .then(res=>res.json())
    .then(data=>{

      console.log(data)
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))
      setProfile(prevState=>{
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,data._id]
          }
        }
      })
      setShowfollow(false)
    })
  }
  const unfollowUser=()=>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    })
    .then(res=>res.json())
    .then(data=>{

      console.log(data)
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))
      setProfile(prevState=>{
        const newFollower=prevState.user.followers.filter(item=>item!==data._id)
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers:newFollower
          }
        }
      })
      setShowfollow(true)
    })
  }
  return(
    <>
      {userProfile?
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>
        <div>
          <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src={userProfile.user.photo}
          />
        </div>
        <div>
            <h4>{userProfile.user.name}</h4>
            <h5>{userProfile.user.email}</h5>
            <div style={{
              display:"flex",
              justifyContent:"space-between",
              width:'108%'
            }}>
              <h6>{userProfile.post.length} posts</h6>
              <h6>{userProfile.user.followers.length} Followers</h6>
              <h6>{userProfile.user.following.length} Following</h6>
            </div>
            {showfollow?
            <button onClick={()=>followUser()} className="btn waves-effect waves-light #1976d2 blue darken-2">Follow</button>:
            <button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #1976d2 blue darken-2">UnFollow</button>
            }
        </div>
      </div>
      <div className="gallery">
            {
              userProfile.post.map(item=>{
                return(
                          <img className="item" src={item.photo} key={item.postedBy._id} alt={item.postedBy.title}/>
                )
              })
            }
        
      </div>
    </div>
      
      :<h2>Loading...</h2>}
    </>
    
    
  )
}

export default Profile