import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchProducts = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  return (
    <div>
      <navBar className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navbar_left mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/">{props.title}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-white fs-4" aria-current="page" href="/about">About</a>
              </li>
            </ul>
            <form className="d-flex navbar_search" role="search" onSubmit={searchProducts}>
              <input className="form-control me-2" type="search" placeholder="Search products" aria-label="Search products" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
              <button className="btn btn-primary fs-5" type="submit">Search</button>
            </form>
            <div className="navbar_right">
              {props.user && <div className="profile_item">
                <span className="profile_symbol" aria-hidden="true">{props.user.name.charAt(0).toUpperCase()}</span>
                <span className="profile_name">{props.user.name}</span>
              </div>}
              {props.user && <button className="nav-link active text-white fs-4 nav_logout" onClick={props.onLogout}>Log out</button>}
            </div>
          </div>
        </div>

      </navBar>
    </div>
  )
}
