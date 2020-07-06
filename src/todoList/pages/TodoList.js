import React, { useState } from "react";

import "./TodoList.css";
import TodoListMain from "../components/TodoListMain";

function TodoList() {
  const [productivity, setProductivity] = useState(0);
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Productivity Generator</h1>
        <p>{productivity}%</p>
      </div>
      <div className="todoListMain">
        <TodoListMain />
      </div>
    </React.Fragment>
  );
}

export default TodoList;
