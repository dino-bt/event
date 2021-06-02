import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Carousel, Card } from "react-bootstrap";

//This is the homepage

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  const userRegister = async (e) => {
    e.preventDefault();

    //we then create a variable to take the states and put them into one unit / object
    let registerUser = {
      email: email,
      password: password,
    };

    // I have opted to use axios in this task it makes things simpler
    const postRegister = await axios.post(
      "http://localhost:8080/auth/",
      registerUser
    );

    const error = postRegister.data.errMessage;
    //we will use this to direct us to the login page

    if (error) {
      //we set an error if the username has been tacken
      setError(postRegister.data.errMessage);

      alert(error);
    } else {
      getLoggedIn();
    }
  };

  return (
    <div className="PostUser">
      <Carousel className="registerCarousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/concert1.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>U2 Live 2018</h2>
            <p>We were stuck in the moment and we can't get out of it... </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/concert2.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h2>Pink Live 2015</h2>
            <p>What an amazing experience it was..... </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/concert3.jpeg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Bon Jovi Live 2019</h3>
            <p>What a prayer come true...</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container-fluid" className="testimonialCards">
        <Card className="U2" >
          <Card.Img
            className="cardImageHeight"
            variant="top"
            src="./images/bono.jpeg"
          />
          <Card.Body className="cardBodyHeight">
            <Card.Title className = "cardTitle">Bono - U2 </Card.Title>
            <Card.Text  className = "cardText">
              Thank you Nexus Events for the amazing experience and
              profesinalism.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="bonJovi" >
          <Card.Img
            className="cardImageHeight"
            variant="top"
            src="./images/bonJovi.jpeg"
          />
          <Card.Body className="cardBodyHeight">
            <Card.Title> Bon Jovi </Card.Title>
            <Card.Text className = "cardText">
              Everything ran smoothely and the staff were so friendly thanks
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="pink" >
          <Card.Img
            className="cardImageHeight"
            variant="top"
            src="./images/pink.jpeg"
          />
          <Card.Body className="cardBodyHeight">
            <Card.Title> Pink </Card.Title>
            <Card.Text className = "cardText">Just Wow thats all I can say!!!</Card.Text>
          </Card.Body>
        </Card>
      </div>

    
      
      
      
      
     <div className = "cardRegister">
        <form className="registerForm" onSubmit={userRegister}>
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
              REGISTER
            </button>
          </div>
        </form>
     
     
      </div>
     
    </div>
  );
};

export default Register;
