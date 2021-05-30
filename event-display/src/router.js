import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FRONT from "./FRONT";
import AuthContext from "./context/AuthContext";
//we create the routes here with the help of Authcontext which will display certain pagge if
//the outcome of logged in is true or false
const Router = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {loggedIn === false && (
          <>
            <Route exact path="/">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
          </>
        )}

        {loggedIn === true && (
          <>
            <Route path="/">
              <FRONT />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
