import React, { useEffect } from "react";
import axios from "axios";

import ToDo from "./ToDo";

// if we pass the prop with curly brackets it acts like a prop and we dont need to add props
function ToDoList({ toDos, setToDos }) {
  //const { userId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/eventdisplaypost/list/"
        );
        const data = response.data;

        setToDos(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  //console.log(toDos);
  // we will map through toDos in order to get each object of todos
  return (
    <div>
      <div className="todo-container">
        <ul>
          {toDos.map((toDo) => (
            <ToDo
              key={toDo._id}
              setToDos={setToDos}
              _id={toDo._id}
              toDo={toDo}
              text={toDo.headerText}
              toDos={toDos}
              bodyText={toDo.bodyText}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
