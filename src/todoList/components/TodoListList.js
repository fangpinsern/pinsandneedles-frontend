import React from "react";

import "./TodoListList.css";
import TodoListItem from "./TodoListItem";

function TodoListList(props) {
  return (
    <React.Fragment>
      <TodoListItem
        list={props.list}
        doneHandler={props.doneHandler}
        editHandler={props.editHandler}
      />
    </React.Fragment>
  );
}

export default TodoListList;
