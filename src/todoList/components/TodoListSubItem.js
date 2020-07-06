import React, { useState } from "react";

import "./TodoListSubItem.css";

import Button from "../../shared/FormElements/Button";
import FormModal from "../../shared/modals/FormModal";
import { useForm } from "../../shared/hooks/form-hooks";

// props
// name
function TodoListSubItem(props) {
  const [editModal, setEditModal] = useState(false);
  const name = props.todo.taskName;

  const taskCompleted = () => {
    props.doneHandler(name);
  };

  const taskEdit = () => {
    setEditModal(true);
  };

  const editTaskCancel = () => {
    setEditModal(false);
  };

  const todoForm = {
    taskName: {
      label: "Task Name",
      value: name,
      isValid: true,
    },
  };

  const [formState, inputHandler] = useForm(todoForm, true);

  const submitEditForm = (event) => {
    event.preventDefault();
    props.editHandler(name, formState.inputs.taskName.value);
    setEditModal(false);
  };

  return (
    <React.Fragment>
      {editModal && (
        <FormModal
          onClear={editTaskCancel}
          showModal={editModal}
          formName={"Edit Task"}
          form={todoForm}
          formState={formState}
          inputHandler={inputHandler}
          submitHandler={submitEditForm}
        />
      )}
      <li>
        <div className="todoListItemItem">
          <div className="todoListItemItem-left">
            <p>{name}</p>
          </div>
          {!props.todo.completed ? (
            <div className="todoListItemItem-right">
              <Button onClick={taskEdit}>Edit</Button>
              <Button onClick={taskCompleted}>Done</Button>
            </div>
          ) : (
            <div className="todoListItemItem-right">
              <Button onClick={taskCompleted}>Incomplete</Button>
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  );
}
export default TodoListSubItem;
