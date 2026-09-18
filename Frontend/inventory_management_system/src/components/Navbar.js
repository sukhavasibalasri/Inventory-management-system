import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      <navBar className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/">{props.title}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/about">About</a>
              </li>
              {props.user && <li className="nav-item profile_item">
                <span className="profile_symbol" aria-hidden="true">{props.user.name.charAt(0).toUpperCase()}</span>
                <span className="profile_name">{props.user.name}</span>
              </li>}
              {props.user && <li className="nav-item"><button className="nav-link active text-white fs-4 nav_logout" onClick={props.onLogout}>Log out</button></li>}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form>
          </div>
        </div>

      </navBar>
    </div>
  )
}
