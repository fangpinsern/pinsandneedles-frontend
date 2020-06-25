import React from "react";

import Card from "../../shared/UIElements/Card";
import UserItem from "./UserItem";

import "./UserList.css";

//props
// users - list of users in the list

function UserList(props) {
  if (props.users.length === 0) {
    return (
      <div className="userList center">
        <Card className="emptyUserListCard">
          <h2>No Users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="userList">
      {props.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.username}
            access={user.access}
          />
        );
      })}
    </ul>
  );
}

export default UserList;
