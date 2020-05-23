import React, { useEffect, useState } from "react";

import ProjectList from "../components/ProjectList";
import "./ProjectMainPage.css";

// import { DumbProj } from "../data/projectData";
import LoadingSpinner from "../../shared/modals/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";

function ProjectMainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedProjects, setLoadedProjects] = useState();

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3002/api/projects");
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setLoadedProjects(resData);
        // console.log(resData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, []);

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
        <h1>Projects</h1>
      </div>
      {!isLoading && loadedProjects && (
        <div className="projectRow">
          <ProjectList items={loadedProjects.projects} />
        </div>
      )}
    </React.Fragment>
  );
}

export default ProjectMainPage;
