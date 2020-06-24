import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      {!auth.isLoggedIn ? (
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
      ) : (
        <li>
          <div className="dropdown">
            <button className="dropbtn">Projects</button>
            <div className="dropdown-content">
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/projects/newinput">New Project</NavLink>
              <NavLink to="/projects/update">Update Project</NavLink>
            </div>
          </div>
        </li>
      )}
      {!auth.isLoggedIn ? (
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      ) : (
        <li>
          <div className="dropdown">
            <button className="dropbtn">Products</button>
            <div className="dropdown-content">
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/products/inventory">Inventory</NavLink>
              <NavLink to="/products/update">Update Products</NavLink>
            </div>
          </div>
        </li>
      )}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
