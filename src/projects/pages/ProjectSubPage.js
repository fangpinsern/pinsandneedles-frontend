import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import LoadingSpinner from "../../shared/modals/LoadingSpinner";

import "./ProjectSubPage.css";

function ProjectSubPage(props) {
  const pid = useParams().pid;
  const api = process.env.REACT_APP_BACKEND_URL + "/api/projects/" + pid;
  // console.log(api);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [projectData, setProjectData] = useState();

  useEffect(() => {
    const sendReq = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(api);
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setProjectData(resData);
        // console.log(resData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err);
      }
    };
    sendReq();
  }, [api]);

  // const project = DumbProj.find((x) => x.id === pid);
  // const project = projectData.project;
  if (!error) {
    return (
      <React.Fragment>
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        {!isLoading && projectData && (
          <div className="projectSubPage">
            <div className="projectSubPageHeader">
              <img
                src={projectData.project.imageUrl}
                alt={projectData.project.title}
              />
              <h1>{projectData.project.title}</h1>
            </div>
            <div className="projectSubPageMain">
              {parse(projectData.project.fullProjectOutline)}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <div className="projectSubPageHeaderError">
        <h1>{error.message}</h1>
      </div>
    );
  }
}

export default ProjectSubPage;
