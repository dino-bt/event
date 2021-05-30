import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
//we bring in create context
const AuthContext = createContext();
//we create this component it will provide us with the information if the user is logged in or not
//if the user is logged in it will show true as we set in the server side that it will be true
//this will be our way of validating that in the front end.

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState("");
  const [userId, setuserId] = useState("");
  // we get the request from the server using axios and we put it into the state
  // (`http://${process.env.PORT}/todos/`)
  const getLoggedIn = async () => {
    const loggedInRes = await axios.get("http://localhost:8080/auth/loggedin");

    setLoggedIn(loggedInRes.data.logged);
    setIsAdmin(loggedInRes.data.admin);
    setuserId(loggedInRes.data.id);
  };
  //we then call the function with a use effect so that it doesnt run into an infinate loop
  useEffect(() => {
    getLoggedIn();
  }, []);
  //we add the router ass the children
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userId , isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
