import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Card } from "react-bootstrap";

//This is our front end login component where we will take the information and put them into different states
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const userLogin = async (e) => {
    e.preventDefault();
//we then create a variable to take the states and put them into one unit / object
    let login = {
      email: email,
      password: password,
    };

    // I have opted to use axios in this task it makes things simpler

    //here we will make a post req

    const postLogin = await axios.post(
      "http://localhost:8080/auth/login",
      login
    );
    //the getlogged in function will move us to the page that will log us in we bring that in from Auth Context

    //here we make conditional statements that if the user enters in the wrong details he will not get in
    //if the do the will getlogged in

    //we get the error from the backend
    const error = postLogin.data.errMessage;

    if (error) {
      setError(postLogin.data.errMessage);

      alert(error);
    } else {
      getLoggedIn();
    }
  };

  return (
    <div className="PostUser">
    <div>
    
  
    <img
      className="frontPic"
      src="./images/login.jpeg"
      alt="First slide"
    />
  </div>
  <br/>


      <Card className = "cardHeaderText">
        <h2>To login as Admin  Email: admin@gmail.com  Password: admin</h2>
      </Card>

      <Card className="cardRegister">
        <form className="registerForm"  onSubmit={userLogin}>
          <div className="emailDiv">
            <input
              className="email"
              type="text"
              name="term"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />
          <div className="registerDiv">
            <input
              className="password"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="buttonDiv">
            <button variant="dark" type="submit" className="createRegister">
              LOGIN
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
