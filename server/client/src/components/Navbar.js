import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const Navbar = () => {
  const [search,setSearch]=useState('')
  const searchModal=useRef(null)
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList=()=>{
    if(state)
    {
      return [
      <li key="1"><i data-target="modal1" className="modal-trigger large material-icons">search</i></li>,
      <li key="2"><Link to="/profile">Profile</Link></li>,
      <li key="3"><Link to="/createpost">Add post</Link></li>,
      <li key="4"><Link to="/myfollowposts">My following Posts</Link></li>,
      <li key="5">
      <button onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/login')
      }} className="btn waves-light #b71c1c red darken-4">Logout</button>
      </li>
    ]
    }
    else{
      return [ <li key="6"><Link to="/login">Login</Link></li>,
      <li key="7"><Link to="/register">Sign Up</Link></li>]
    }
  }
  
  return(
  <nav className="#7e57c2 deep-purple lighten-1">
    <div className="nav-wrapper">
      <Link to={state?"/":"/login"} className="brand-logo">Socio</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
        <div className="modal-content">
        <input type="email" placeholder="Search User" value={search} onChange={(e)=>setSearch(e.target.value)} required/>
        </div>
        <div className="modal-footer">
          <button  className="modal-close waves-effect waves-green btn-flat">Agree</button>
        </div>
    </div>
  </nav>
  )
}
export default Navbar
