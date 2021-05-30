import React, { useState } from "react";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";
//I am using the same model as My todo list for some of the states
// here we create the use state method
// we create another state to store the to dos
//we pass down the todos(eventDisplay) which is the stored date into the to do list

function FRONT() {
  const [toDos, setToDos] = useState([]);

  return (
    <div className="PostUser">
      <div className="carouselFront">
        <h2 style={{ color: "black" }}>Proudly Sponsored by ...</h2>
        <br />
        <img
          className="frontPic"
          src="./images/heineken.jpeg"
          alt="First slide"
        />
      </div>

      
        <h1 className="upcomingTitle">Upcoming Events</h1>
      

      <Form toDos={toDos} setToDos={setToDos}/>

      <ToDoList toDos={toDos} setToDos={setToDos} />
    </div>
  );
}

export default FRONT;
