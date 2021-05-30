import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

//we are creating a form component

function Form({ toDos, setToDos }) {
  const [bodyText, setBodyText] = useState("");
  const [inputText, setInputText] = useState("");

  const { isAdmin } = useContext(AuthContext);
  //We bring in the isAdmin component to create conditional statements only allowing the admin to have acces to certian criteria

  //Submittodohandler will be called by a button and post the information the server

  const submitToDoHandler = async (e) => {
    e.preventDefault();

    let registerTodo = {
      headerText: inputText,
      bodyText: bodyText,
    };

    //with axios we send the request  and with the response we add it to state
    const responseToDo = await axios.post(
      "http://localhost:8080/eventdisplaypost/",
      registerTodo
    );

    setToDos([...toDos, responseToDo.data]);
    setInputText("");
    setBodyText("");
  };
  //here we have the admin is true we use a turnery operator
  //we set the input text and body tex that will go eventually down to the the schema 
  return (
    <div>
      {isAdmin === "true" ? (
        <form className = "divFormPost">
        <div className="divHeaderText">
          <input
          placeholder="Post New Artist"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            className="headerText"
          />
          </div>
          <div className="divBodyText">
          <input
          placeholder="Post New Details"
          
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            type="text"
            className="bodyText"
          />
          
          <button
            onClick={submitToDoHandler}
            className="todo-button"
            type="submit"
          >
            <i className="fas fa-plus-square"></i>
          </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default Form;
