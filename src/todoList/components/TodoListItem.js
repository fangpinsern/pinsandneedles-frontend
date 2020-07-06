import React from "react";

import "./TodoListItem.css";

import TodoListSubItem from "./TodoListSubItem";

//props
// tasks -  array of tasks

function TodoListItem(props) {
  return (
    <ul className="todoListItem">
      {props.list.map((todo) => {
        return (
          <TodoListSubItem
            key={todo.id}
            todo={todo}
            doneHandler={props.doneHandler}
            editHandler={props.editHandler}
          />
        );
      })}
    </ul>
  );
}

export default TodoListItem;
