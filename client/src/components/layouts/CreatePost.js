import React from 'react'

const CreatePost=()=>{
  return(
    <div className="card input-field"
    style={{
      margin:"30px auto",
      maxWidth:"500px",
      padding:"20px",
      textAlign:"center"
          }}>
      <input type="text" placeholder="title"/>
      <input  type="text" placeholder="body"/>
      <div className="file-field input-field">
        <div className="btn #1976d2 blue darken-2">
        <span>Upload File</span>
        <input type="file" />
        </div>
        <div class="file-path-wrapper">
        <input class="file-path validate" type="text" />
      </div>
      </div>
      <button className="btn waves-effect waves-light #1976d2 blue darken-2">Add Post</button>
    </div>
  )
}

export default CreatePost