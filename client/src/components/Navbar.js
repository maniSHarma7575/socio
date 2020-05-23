import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state)
    {
      return [<li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/createpost">Add post</Link></li>,
      <li>
      <button onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/login')
      }} className="btn waves-light #b71c1c red darken-4">Logout</button>
      </li>
    ]
    }
    else{
      return [ <li><Link to="/login">Login</Link></li>,
      <li><Link to="/register">Sign Up</Link></li>]
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
  </nav>
  )
}
export default Navbar
