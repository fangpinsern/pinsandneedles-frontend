import React, { useState } from "react";

import "./TodoListMain.css";
import Button from "../../shared/FormElements/Button";
import TodoListList from "./TodoListList";
import { DumbTodo } from "../data/todoData";
import FormModal from "../../shared/modals/FormModal";
import { useForm } from "../../shared/hooks/form-hooks";

function TodoListMain() {
  const [completed, setCompleted] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const changeCompleted = () => {
    setCompleted(!completed);
  };

  const addTasks = () => {
    setAddTaskModal(true);
  };

  const addTasksCancel = () => {
    setAddTaskModal(false);
  };

  const completedList = DumbTodo.filter((todo) => todo.completed);
  const incompleteList = DumbTodo.filter((todo) => !todo.completed);

  const doneHandler = (taskName) => {
    for (let i in DumbTodo) {
      if (DumbTodo[i].taskName === taskName) {
        const toChange = DumbTodo[i].completed;
        DumbTodo[i].completed = !toChange;
        break;
      }
    }
    setSubmitted(!submitted);
  };

  const editHandler = (taskName, newName) => {
    for (let i in DumbTodo) {
      if (DumbTodo[i].taskName === taskName) {
        //   const toChange = DumbTodo[i].completed;
        DumbTodo[i].taskName = newName;
        break;
      }
    }
    setSubmitted(!submitted);
  };
  // Add todo form
  const todoForm = {
    taskName: {
      label: "Task Name",
      value: "",
      isValid: false,
    },
  };

  const [todoFormState, inputHandler, setFormState] = useForm(todoForm, false);

  const submitToDoForm = (event) => {
    // console.log("i am here");
    event.preventDefault();
    const taskObj = {
      id: "t4",
      taskName: todoFormState.inputs.taskName.value,
      completed: false,
    };

    DumbTodo.push(taskObj);
    setFormState(todoForm, false);
    setAddTaskModal(false);
  };

  return (
    <React.Fragment>
      {addTaskModal && (
        <FormModal
          onClear={addTasksCancel}
          showModal={addTaskModal}
          formName={"New Task"}
          form={todoForm}
          formState={todoFormState}
          inputHandler={inputHandler}
          submitHandler={submitToDoForm}
        />
      )}
      <div className="todoListMain-left">
        <h2>{completed ? "Completed Tasks" : "To be completed"}</h2>
        {!completed ? (
          <TodoListList
            list={incompleteList}
            doneHandler={doneHandler}
            editHandler={editHandler}
          />
        ) : (
          <TodoListList list={completedList} doneHandler={doneHandler} />
        )}
      </div>
      <div className="todoListMain-right">
        <Button onClick={addTasks}>Add Task</Button>
        <Button onClick={changeCompleted}>Completed</Button>
      </div>
    </React.Fragment>
  );
}

export default TodoListMain;
