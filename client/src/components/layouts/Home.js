import React, { useEffect,useState } from 'react'

const Home=()=>{
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
  return(
    <div className="home">
      {data.map(item=>{
        return(
          <div className="card home-card" key={item.postedBy._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image">
                <img src={item.photo} />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                <h6>{item.title}</h6>
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