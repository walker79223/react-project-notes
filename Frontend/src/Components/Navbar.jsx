import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = (props) => {
  let history = useNavigate()
  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      props.showAlert("info", "Logout Successfully")
      history("/")
    }
  }
  let token = localStorage.getItem("token")
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link mx-2" aria-current="page" to="/" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" >About</Link>
            </li>
            {token && <li className="nav-item">
              <Link className="nav-link" to="/notes" >Notes</Link>
            </li>}
          </ul>
          <form className="d-flex" role="search">
            {token ? (
              <button className="btn btn-primary" onClick={logout} aria-current="page">Logout</button>)
              : (
                <div>
                  <Link to="/login" className="btn btn-primary mx-3" aria-current="page">Login</Link>
                  <Link to="/signup" className="btn btn-primary" aria-current="page">Signup</Link>
                </div>

              )}


          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar