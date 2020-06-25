import React, { useState, useContext } from "react";

import Card from "../../shared/UIElements/Card";

import { Link } from "react-router-dom";

import "./UserItem.css";
import Button from "../../shared/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";

// props
// id
// src
// name
// description

function UserItem(props) {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const accessModifier = async (event) => {
    event.preventDefault();
    const accessType = event.target.value;
    console.log(accessType);
    const accessObj = {
      accessType,
      uid: props.id,
    };
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/users/changeaccess",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify(accessObj),
        }
      );

      // console.log(response.body);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg);
      }
      // console.log("Iamhere");
      //   console.log(responseData);
      setIsLoading(false);
      //   setResId(responseData.project.id);
      //   setSubmitted(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.msg || "Something went wrong, please try again");
    }
  };

  return (
    <li className="userItem">
      <Card className="userItemCard">
        <Link to={`/users/${props.id}`}>
          <div className="userItemInfo">
            <h2>{props.name}</h2>
            <p>{props.access}</p>
          </div>
        </Link>
        <div className="accessRightsButton">
          <p>Access Rights</p>
          <Button
            type="button"
            className="accessButton"
            onClick={accessModifier}
            value="friends"
          >
            Friends
          </Button>
          <Button
            type="button"
            className="accessButton"
            onClick={accessModifier}
            value="family"
          >
            Family
          </Button>
          <Button
            type="button"
            className="accessButton"
            onClick={accessModifier}
            value="admin"
          >
            Admin
          </Button>
        </div>
      </Card>
    </li>
  );
}

export default UserItem;
