import React, { useContext } from "react";

import "./Footer.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

function Footer(props) {
  const auth = useContext(AuthContext);
  return (
    // <div className="footerMain">
    <div className="footerRow">
      {/* Column 1 */}
      <div className="footerMainLeft">
        <h4>Navigation</h4>
        <ul>
          <li>1234-5678</li>
          <li>Singapore</li>
          <li>Somewhere</li>
        </ul>
      </div>
      {/* column 2 */}
      <div className="footerMainCenter">
        <h4>Others</h4>
        <ul>
          <li>
            <NavLink to="/login">Sign In</NavLink>
          </li>
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
        <h4>Contact</h4>
        <ul>
          <li>1234-5678</li>
          <li>Singapore</li>
          <li>Somewhere</li>
        </ul>
      </div>
      {/* <div className="footer-row"></div> */}
    </div>
    // </div>
  );
}

export default Footer;
