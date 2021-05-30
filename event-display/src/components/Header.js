import React, { useContext } from "react";
import { Link } from "react-router-dom";
//I am using bootstrap to style the the dropdown menu styled button

import AuthContext from "../context/AuthContext";
import LogOut from "./auth/LogOut";

import { Navbar } from "react-bootstrap";

//I put the drop menu in a header component
//we import auth context and we will use it to display certain things if we logged in is = to false or true

const Header = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      {loggedIn === false && (
        <>
          <Navbar className="Navbar">
            <Link className="Register" to="/">
              HOME
            </Link>

            <Link className="Login" to="/login">
              LOGIN
            </Link>
          </Navbar>
        </>
      )}

      {loggedIn === true && (
        <>
          <Navbar className="Navbar">
         


            <LogOut />
          </Navbar>
        </>
      )}
    </div>
  );
};

export default Header;
