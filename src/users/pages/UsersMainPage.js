import React, { useState, useEffect, useContext } from "react";

import "./UsersMainPage.css";
import ErrorModal from "../../shared/modals/ErrorModal";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import UserList from "../components/UserList";
import { AuthContext } from "../../shared/context/auth-context";

function UsersMainPage() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/users/allusers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setLoadedUsers(resData);
        // console.log(resData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, [auth.token]);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div className="homeHeader">
        <h1>Users</h1>
      </div>
      {!isLoading && loadedUsers && (
        <div className="projectRow">
          <UserList users={loadedUsers.users} />
        </div>
      )}
    </React.Fragment>
  );
}

export default UsersMainPage;
