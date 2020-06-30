import React, { useContext } from "react";

import "./Footer.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

function Footer(props) {
  const auth = useContext(AuthContext);
  return (
    // <div className="footerMain">
    <React.Fragment>
      <hr></hr>
      <div className="footerRow">
        {/* Column 1 */}
        <div className="footerMainLeft">
          <h4>Navigation</h4>
          <ul>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            {/* <li>
              <NavLink to="/about">Hire me?</NavLink>
            </li> */}
            <li>Coming Soon</li>
          </ul>
        </div>
        {/* column 2 */}
        <div className="footerMainCenter">
          <h4>Others</h4>
          <ul>
            {!auth.isLoggedIn && (
              <li>
                <NavLink to="/login">Sign In</NavLink>
              </li>
            )}
            {/* {!auth.isLoggedIn && (
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          )} */}
            {auth.isLoggedIn && (
              <li>
                <NavLink to="/updateinfo">Update Info</NavLink>
              </li>
            )}
            {auth.isLoggedIn && (
              <li>
                <NavLink to="/" onClick={auth.logout}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {/* column 3 */}
        <div className="footerMainRight">
          <NavLink to="/contact">
            <h4>Contact</h4>
          </NavLink>

          <ul>
            <li>pinsernfang@gmail.com</li>
            <li>Singapore</li>
          </ul>
        </div>
        {/* <div className="footer-row"></div> */}
      </div>
    </React.Fragment>
    // </div>
  );
}

export default Footer;
