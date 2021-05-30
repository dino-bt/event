import React, { useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";


//is a basic logout out function


const LogOut = () => {
  const { getLoggedIn } = useContext(AuthContext);

  const logOutHandler = async () => {
    

    await axios.get("http://localhost:8080/auth/logout");

    getLoggedIn();
  };

  return (
    <h3 className="logOut" onClick={logOutHandler}>
      LOG OUT
    </h3>
  );
};

export default LogOut;
