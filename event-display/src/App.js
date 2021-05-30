import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import Router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//this will allow axios to receive the credentials from the server which is the cookie which contains the web token.

axios.defaults.withCredentials = true;

function App() {
  //we wrap authcontextprovider around router as a parent
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
