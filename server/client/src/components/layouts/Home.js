import React, { useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home=()=>{
  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([])
  const [com,setCom]=useState('')
  useEffect(()=>{
    
      fetch('/allpost',{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        console.log(state)
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
           return {...result.result, likes: result.result.likes,updated:'updated'}
          }
          else{
            return item
          }
        })
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
            return result.result
          }
          else{
            return item
          }
        })
        setData(newData)
      })
      .catch(error=>{
        console.log(error)
      })
  }
  const makeComment=(text,postedBy)=>{
    console.log(text,postedBy)
    fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text:text,
        postedBy:postedBy
      })
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData=data.map(item=>{
          
        if(item._id===result._id)
        {
          return result
        }
        else{
          return item
        }
      })
      setCom('')
      setData(newData)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const deletePost=(postId)=>{
      fetch(`/deletepost/${postId}`,{
        method:"delete",
        headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
        }
      })
      .then(res=>res.json())
      .then(result=>{
        console.log(result)
        const newData=data.filter(item=>{
          return item._id!=result._id
        })
        setData(newData)
      })

  }
  return(
    <div className="home">
      {
        data.map(item=>{ 
        return(
          <div className="card home-card" key={item._id}>
              <h5 style={{fontWeight:"bold",padding:"5px"}} >
              <Link to={item.postedBy._id!==state._id ?`/profile/${item.postedBy._id}`:`/profile`}>{item.postedBy.name}</Link> {item.postedBy._id==state._id && <i style={{float:"right"}}class="material-icons" onClick={()=>deletePost(item._id)}>delete</i> } </h5>
              <div className="card-image">
                <img src={item.photo} />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                {item.likes.includes(state._id)?
                <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>:
                <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                }
                <h6>{item.likes.length} likes</h6>
                <h6 style={{fontWeight:"bold"}}>{item.title}</h6>
                <p>{item.body}</p>
                {
                  item.comments.map(comment=>{
                    return(
                      <h6 key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name} </span>{comment.text}</h6>
                    )
                  })
                }
                <form onSubmit={(e)=>{
                  console.log('clicked')
                  e.preventDefault()
                  makeComment(com,item._id)
                  
                }}>
                <input type="text" placeholder="Add a comment" value={com} onChange={e=>{setCom(e.target.value)}}/>
                </form>
              </div>
        </div>
        )
      })}
      
     
      
    </div>
  )
}

export default Home