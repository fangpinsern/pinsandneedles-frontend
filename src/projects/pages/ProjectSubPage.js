import React from "react";
import { useParams } from "react-router-dom";

import { DumbProj } from "../data/projectData";

function ProjectSubPage(props) {
  const pid = useParams().pid;

  const project = DumbProj.find((x) => x.id === pid);
  if (project) {
    return (
      <React.Fragment>
        <h1>{project.title}</h1>
        <p>{project.fullProjectOutline}</p>
      </React.Fragment>
    );
  } else {
    return <h1>Project does not exist</h1>;
  }
}

export default ProjectSubPage;
