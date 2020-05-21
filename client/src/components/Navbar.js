import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return(
  <nav className="#7e57c2 deep-purple lighten-1">
    <div class="nav-wrapper">
      <Link to="/" class="brand-logo">Socio</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  </nav>
  )
}
export default Navbar
