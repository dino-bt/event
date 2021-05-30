import React, {useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import {  Card } from "react-bootstrap";
//import UpdateEventDisplay from "./Update"
//we add the text element as the prop
//we create the delete handler it will will run through the lsit and check the ids
//if the id is not equal it wont delete but if it is it will delete.
function ToDo ({ toDos, setToDos, toDo, _id, text, bodyText }) {
  
  const [newHeaderText, setNewHeaderText] = useState("")
  const [newBodyText,setNewBodyText] = useState("")
  
  const { isAdmin } = useContext(AuthContext);
  


  //-------------- you will need to change this function so that information will come from mongodb

  const deleteHandler = async (_id) => {
    await axios.delete(
      "http://localhost:8080/eventdisplaypost/delete/" + _id
    );

    setToDos(toDos.filter((el) => el._id !== toDo._id));
  };
  // here we create  the handlers that will change the state of the key completed to true and false on each click we do this
  //so we can later on manipulate the function to create something in css

  //console.log(toDo);
 const updateEventDisplay = async (e) => {
    e.preventDefault();
   
   
  const newUpdateEventDisplay = {
    newHeaderText: newHeaderText,
    newBodyText: newBodyText,
}
   
   
 await axios.put("http://localhost:8080/eventdisplaypost/update/" + _id, newUpdateEventDisplay  )
//const data = updateEventDisplay.data


let finalCopy = [...toDos];
    //console.log(finalCopy);

    for (let finalEventDisplay of finalCopy) {
      if (finalEventDisplay._id === _id) {
        finalEventDisplay.headerText  = newHeaderText;
        finalEventDisplay.bodyText = newBodyText;
        
      }
      }
setToDos(finalCopy);
    }



  return (
    <div className="todo">
      <Card className="eventDisplay">
        <Card.Header>{text}</Card.Header>
        {isAdmin === "true" ? (
          <button className="trash" onClick={() => deleteHandler(_id)}>
            <i className="far fa-trash-alt "></i>
          </button>
          
          
        ) : (
          ""
        )}

        {isAdmin === "true" ? (

          
          <form className="updateForm" onSubmit={updateEventDisplay}>

          <div className= "updateHeadertext">
          <input
          placeholder="Update Artist"
            value={newHeaderText}
            onChange={(e)=> setNewHeaderText(e.target.value)}
            type="text"
            className="todo-input"
          />
          </div>
          <div className= "updateBodyText">
          <input
          placeholder="Update Details"
          value={newBodyText}
          onChange={(e)=> setNewBodyText(e.target.value)}
          type="text"
          className="body-text"
        />
          <button className="todo-button" type="submit" >
            <i className="fas fa-plus-square"></i>
          </button>
          </div>
        
        
          
        </form>
        
          
          
          ) : (
            ""
          )}
        
        
        
       
        
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {bodyText}
            </p>
            <footer className="blockquote-footer">
             Don't forget to get your tickets before it's too late!
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ToDo;
