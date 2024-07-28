import React from 'react'
import {Link,useLocation} from "react-router-dom"
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  let history = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history("/login");   // Navigate to the login page
  }
  let location = useLocation()  // Hook to get the current location

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"}?"active":"" `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"}?"active":"" `} to="/about">About</Link>
        </li>
      </ul>
      
      {/* If the user is not logged in, show Login and Signup buttons. Otherwise, show Logout button. */}
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
      <Link className='btn btn-primary mx-1' to='/login' role='button'>Login</Link>
      <Link className='btn btn-primary mx-1' to='/signup' role='button'>Signup</Link>
      </form>:<button  onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
