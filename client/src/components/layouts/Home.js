import React, { useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'

const Home=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([])
  useEffect(()=>{
      fetch('/allpost',{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        setData(result.result)
      })
  },[])

  const likePost=(id)=>{
    fetch('/like',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })

    })
      .then(res=>res.json())
      .then(result=>{
        
        const newData=data.map(item=>{
          if(item._id===result.result._id)
          {
           // console.log(result.result)
           return {...result.result, likes: result.result.likes,updated:'updated'}
          }
          else{
           // console.log(item)
            return item
          }
        })
        //console.log(newData)
        
        console.log(newData)
        setData(newData)
      })
      .catch(error=>{
        console.log(error)
      })

  }
  const unlikePost=(id)=>{
    fetch('/unlike',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    })
      .then(res=>res.json())
      .then(result=>{
        
        const newData=data.map(item=>{
          
          if(item._id===result.result._id)
          {
       //     console.log(result.result)
            return result.result
          }
          else{
       //     console.log(item)
            return item
          }
        })
       // console.log(result.result._id)
        setData(newData)
      })
      .catch(error=>{
        console.log(error)
      })

    
  }
  
  return(
    <div className="home">
      {
        data.map(item=>{ 
          console.log(item.likes.length)
        return(
          <div className="card home-card" key={item.postedBy._id}>
              <h5 style={{fontWeight:"bold"}} >{item.postedBy.name}</h5>
              <div className="card-image">
                <img src={item.photo} />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                {item.likes.includes(state._id)?
                <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i>:
                <i className="material-icons" onClick={()=>likePost(item._id)}>thumb_up</i>
                }
                <h6>{item.likes.length} likes</h6>
                <h6 style={{fontWeight:"bold"}}>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="Add a comment"/>
              </div>
        </div>
        )
      })}
      
     
      
    </div>
  )
}

export default Home